(function () {
    function initAerialLandscape(canvas) {
        if (!canvas) return function () {};

        var context = canvas.getContext('2d');
        if (!context) return function () {};

        var width = 0;
        var height = 0;
        var pixelRatio = 1;
        var frame = 0;
        var elapsed = 0;
        var lastFrameTime = null;
        var stopped = false;
        var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

        var contourLevels = [0.23, 0.31, 0.39, 0.47, 0.55, 0.63, 0.71];
        var gridColumns = 0;
        var gridRows = 0;
        var field = new Float32Array(0);

        function gaussian(x, y, centerX, centerY, radiusX, radiusY, angle) {
            var dx = x - centerX;
            var dy = y - centerY;
            var cosine = Math.cos(angle);
            var sine = Math.sin(angle);
            var localX = dx * cosine - dy * sine;
            var localY = dx * sine + dy * cosine;
            return Math.exp(-0.5 * (localX * localX / (radiusX * radiusX) + localY * localY / (radiusY * radiusY)));
        }

        function sampleElevation(x, y, time) {
            var drift = time * 0.000035;
            var warpedX = x + Math.sin(y * 8.1 + drift) * 0.018 + Math.sin(y * 17.2 - drift * 0.53) * 0.006;
            var warpedY = y + Math.cos(x * 7.4 - drift * 0.8) * 0.016 + Math.sin(x * 15.3 + drift * 0.41) * 0.006;
            var elevation =
                gaussian(warpedX, warpedY, -0.10, 0.43, 0.23, 0.31, -0.48) * 0.78 +
                gaussian(warpedX, warpedY, 1.09, 0.35, 0.24, 0.33, 0.52) * 0.82 +
                gaussian(warpedX, warpedY, 0.12, 1.08, 0.34, 0.25, 0.16) * 0.72 +
                gaussian(warpedX, warpedY, 0.94, 1.00, 0.28, 0.27, -0.61) * 0.75;

            elevation += Math.sin(warpedX * 13 + warpedY * 9 + drift * 0.7) *
                Math.cos(warpedY * 11 - warpedX * 7 - drift * 0.5) * 0.022;
            return elevation;
        }

        function prepareField() {
            gridColumns = Math.max(2, Math.ceil(width / 12));
            gridRows = Math.max(2, Math.ceil(height / 12));
            field = new Float32Array((gridColumns + 1) * (gridRows + 1));
        }

        function paintAtmosphere(time) {
            var drift = time * 0.000055;
            var glowX = width * (0.48 + Math.sin(drift) * 0.22);
            var glowY = height * (0.52 + Math.cos(drift * 0.7) * 0.035);
            var glowRadius = Math.max(width, height) * 0.72;
            var coolGlow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
            coolGlow.addColorStop(0, 'rgba(54, 171, 210, 0.095)');
            coolGlow.addColorStop(0.42, 'rgba(31, 95, 188, 0.055)');
            coolGlow.addColorStop(1, 'rgba(17, 46, 113, 0)');
            context.fillStyle = coolGlow;
            context.fillRect(0, 0, width, height);

            var dawnX = width * (0.76 + Math.sin(drift * 0.63 + 1.2) * 0.12);
            var dawnY = height * 0.49;
            var dawnRadius = Math.max(width, height) * 0.36;
            var dawnGlow = context.createRadialGradient(dawnX, dawnY, 0, dawnX, dawnY, dawnRadius);
            dawnGlow.addColorStop(0, 'rgba(232, 201, 122, 0.045)');
            dawnGlow.addColorStop(0.55, 'rgba(232, 201, 122, 0.014)');
            dawnGlow.addColorStop(1, 'rgba(232, 201, 122, 0)');
            context.fillStyle = dawnGlow;
            context.fillRect(0, 0, width, height);
        }

        function crossing(x1, y1, value1, x2, y2, value2, level) {
            var amount = (level - value1) / (value2 - value1);
            return [x1 + (x2 - x1) * amount, y1 + (y2 - y1) * amount];
        }

        function drawContourPath(points, closed) {
            if (points.length < 2) return;

            if (closed && points.length > 2) {
                var lastPoint = points[points.length - 1];
                var firstPoint = points[0];
                context.moveTo((lastPoint[0] + firstPoint[0]) * 0.5, (lastPoint[1] + firstPoint[1]) * 0.5);
                for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
                    var currentPoint = points[pointIndex];
                    var nextPoint = points[(pointIndex + 1) % points.length];
                    context.quadraticCurveTo(
                        currentPoint[0],
                        currentPoint[1],
                        (currentPoint[0] + nextPoint[0]) * 0.5,
                        (currentPoint[1] + nextPoint[1]) * 0.5
                    );
                }
                context.closePath();
                return;
            }

            context.moveTo(points[0][0], points[0][1]);
            for (var openIndex = 1; openIndex < points.length - 1; openIndex++) {
                var openPoint = points[openIndex];
                var followingPoint = points[openIndex + 1];
                context.quadraticCurveTo(
                    openPoint[0],
                    openPoint[1],
                    (openPoint[0] + followingPoint[0]) * 0.5,
                    (openPoint[1] + followingPoint[1]) * 0.5
                );
            }
            var finalPoint = points[points.length - 1];
            context.lineTo(finalPoint[0], finalPoint[1]);
        }

        function traceContourSegments(segments) {
            var connections = new Map();

            for (var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
                var segment = segments[segmentIndex];
                for (var endpointIndex = 0; endpointIndex < 2; endpointIndex++) {
                    var endpoint = segment[endpointIndex];
                    if (!connections.has(endpoint.id)) connections.set(endpoint.id, []);
                    connections.get(endpoint.id).push({ segment: segmentIndex, endpoint: endpointIndex });
                }
            }

            var visited = new Uint8Array(segments.length);

            function trace(startKey, startConnection) {
                var points = [segments[startConnection.segment][startConnection.endpoint].point];
                var currentSegment = startConnection.segment;
                var currentEndpoint = startConnection.endpoint;
                var closed = false;

                while (!visited[currentSegment]) {
                    visited[currentSegment] = 1;
                    var nextEndpoint = 1 - currentEndpoint;
                    var nextNode = segments[currentSegment][nextEndpoint];
                    if (nextNode.id === startKey) {
                        closed = true;
                        break;
                    }
                    points.push(nextNode.point);

                    var links = connections.get(nextNode.id) || [];
                    var nextConnection = null;
                    for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                        if (!visited[links[linkIndex].segment]) {
                            nextConnection = links[linkIndex];
                            break;
                        }
                    }
                    if (!nextConnection) break;
                    currentSegment = nextConnection.segment;
                    currentEndpoint = nextConnection.endpoint;
                }

                drawContourPath(points, closed);
            }

            connections.forEach(function (links, key) {
                if (links.length === 2) return;
                for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                    if (!visited[links[linkIndex].segment]) trace(key, links[linkIndex]);
                }
            });

            for (var remainingIndex = 0; remainingIndex < segments.length; remainingIndex++) {
                if (!visited[remainingIndex]) trace(segments[remainingIndex][0].id, { segment: remainingIndex, endpoint: 0 });
            }
        }

        function paintContours(time) {
            var cellWidth = width / gridColumns;
            var cellHeight = height / gridRows;

            for (var row = 0; row <= gridRows; row++) {
                for (var column = 0; column <= gridColumns; column++) {
                    var x = column * cellWidth;
                    var y = row * cellHeight;
                    field[row * (gridColumns + 1) + column] = sampleElevation(x / width, y / height, time);
                }
            }

            context.lineCap = 'round';
            context.lineJoin = 'round';

            for (var levelIndex = 0; levelIndex < contourLevels.length; levelIndex++) {
                var level = contourLevels[levelIndex];
                context.beginPath();
                var segments = [];

                for (var row = 0; row < gridRows; row++) {
                    for (var column = 0; column < gridColumns; column++) {
                        var topLeftIndex = row * (gridColumns + 1) + column;
                        var topRightIndex = topLeftIndex + 1;
                        var bottomLeftIndex = topLeftIndex + gridColumns + 1;
                        var bottomRightIndex = bottomLeftIndex + 1;
                        var topLeft = field[topLeftIndex];
                        var topRight = field[topRightIndex];
                        var bottomRight = field[bottomRightIndex];
                        var bottomLeft = field[bottomLeftIndex];
                        var x0 = column * cellWidth;
                        var x1 = x0 + cellWidth;
                        var y0 = row * cellHeight;
                        var y1 = y0 + cellHeight;
                        var points = [];
                        var crossedEdges = [];

                        if ((topLeft < level) !== (topRight < level)) {
                            points[0] = {
                                id: 'h' + row + ':' + column,
                                point: crossing(x0, y0, topLeft, x1, y0, topRight, level)
                            };
                            crossedEdges.push(0);
                        }
                        if ((topRight < level) !== (bottomRight < level)) {
                            points[1] = {
                                id: 'v' + row + ':' + (column + 1),
                                point: crossing(x1, y0, topRight, x1, y1, bottomRight, level)
                            };
                            crossedEdges.push(1);
                        }
                        if ((bottomRight < level) !== (bottomLeft < level)) {
                            points[2] = {
                                id: 'h' + (row + 1) + ':' + column,
                                point: crossing(x1, y1, bottomRight, x0, y1, bottomLeft, level)
                            };
                            crossedEdges.push(2);
                        }
                        if ((bottomLeft < level) !== (topLeft < level)) {
                            points[3] = {
                                id: 'v' + row + ':' + column,
                                point: crossing(x0, y1, bottomLeft, x0, y0, topLeft, level)
                            };
                            crossedEdges.push(3);
                        }

                        if (crossedEdges.length === 2) {
                            var firstPoint = points[crossedEdges[0]];
                            var secondPoint = points[crossedEdges[1]];
                            segments.push([firstPoint, secondPoint]);
                        } else if (crossedEdges.length === 4) {
                            var centerAbove = (topLeft + topRight + bottomRight + bottomLeft) * 0.25 >= level;
                            var edgePairs = centerAbove ? [[0, 1], [2, 3]] : [[0, 3], [1, 2]];
                            for (var pairIndex = 0; pairIndex < edgePairs.length; pairIndex++) {
                                var pair = edgePairs[pairIndex];
                                segments.push([points[pair[0]], points[pair[1]]]);
                            }
                        }
                    }
                }

                traceContourSegments(segments);
                var levelDistance = Math.abs(levelIndex - (contourLevels.length - 1) * 0.5) / (contourLevels.length * 0.5);
                var lineOpacity = 0.12 * (1 - levelDistance * 0.5);
                context.strokeStyle = 'rgba(255, 255, 255, ' + lineOpacity.toFixed(3) + ')';
                context.lineWidth = 1;
                context.stroke();
            }
        }

        function draw(time) {
            context.clearRect(0, 0, width, height);
            paintAtmosphere(time);
            paintContours(time);
        }

        function animate(timestamp) {
            frame = 0;
            if (stopped || document.hidden) return;

            if (lastFrameTime !== null) elapsed += Math.min(timestamp - lastFrameTime, 48);
            lastFrameTime = timestamp;
            draw(elapsed);

            if (!motionPreference.matches) frame = window.requestAnimationFrame(animate);
        }

        function schedule() {
            if (stopped || document.hidden) return;
            if (motionPreference.matches) {
                draw(elapsed);
            } else if (!frame) {
                frame = window.requestAnimationFrame(animate);
            }
        }

        function cancelFrame() {
            if (!frame) return;
            window.cancelAnimationFrame(frame);
            frame = 0;
        }

        function resize() {
            var bounds = canvas.parentElement.getBoundingClientRect();
            width = bounds.width;
            height = bounds.height;
            pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.max(1, Math.round(width * pixelRatio));
            canvas.height = Math.max(1, Math.round(height * pixelRatio));
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            prepareField();
            draw(elapsed);
            schedule();
        }

        function onVisibilityChange() {
            cancelFrame();
            lastFrameTime = null;
            if (!document.hidden) schedule();
        }

        function onMotionPreferenceChange() {
            cancelFrame();
            lastFrameTime = null;
            draw(elapsed);
            schedule();
        }

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', onVisibilityChange);
        if (motionPreference.addEventListener) {
            motionPreference.addEventListener('change', onMotionPreferenceChange);
        } else if (motionPreference.addListener) {
            motionPreference.addListener(onMotionPreferenceChange);
        }

        resize();

        return function () {
            stopped = true;
            cancelFrame();
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            if (motionPreference.removeEventListener) {
                motionPreference.removeEventListener('change', onMotionPreferenceChange);
            } else if (motionPreference.removeListener) {
                motionPreference.removeListener(onMotionPreferenceChange);
            }
        };
    }

    window.initAerialLandscape = initAerialLandscape;
})();
