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
        var contourFields = [];

        function prepareFields() {
            var portrait = width < height * 0.95;
            if (portrait) {
                contourFields = [
                    { x: 0.04, y: 0.34, rx: 0.4, ry: 0.3, count: 10, phase: 0.2, speed: 0.00009, color: '143,206,255' },
                    { x: 0.96, y: 0.68, rx: 0.4, ry: 0.34, count: 10, phase: 2.4, speed: -0.000075, color: '255,204,151' },
                    { x: 0.52, y: -0.38, rx: 0.46, ry: 0.44, count: 7, phase: 1.2, speed: 0.000065, color: '205,226,255' }
                ];
            } else {
                contourFields = [
                    { x: 0.06, y: 0.52, rx: 0.32, ry: 0.39, count: 11, phase: 0.3, speed: 0.00009, color: '143,206,255' },
                    { x: 0.94, y: 0.59, rx: 0.32, ry: 0.42, count: 11, phase: 2.5, speed: -0.000075, color: '255,204,151' },
                    { x: 0.5, y: -0.58, rx: 0.36, ry: 0.7, count: 8, phase: 1.1, speed: 0.000065, color: '205,226,255' }
                ];
            }
        }

        function contourPoint(field, radius, angle, time) {
            var drift = time * field.speed + field.phase;
            var shape = 1 +
                Math.sin(angle * 3 + drift) * 0.075 +
                Math.cos(angle * 2 - drift * 0.7) * 0.046 +
                Math.sin(angle * 5 + drift * 0.52) * 0.022;
            var tilt = Math.sin(drift * 0.38) * 0.035;
            var horizontal = Math.cos(angle) * field.rx * radius * shape;
            var vertical = Math.sin(angle) * field.ry * radius * shape;

            return {
                x: (field.x + horizontal * Math.cos(tilt) - vertical * Math.sin(tilt)) * width,
                y: (field.y + horizontal * Math.sin(tilt) + vertical * Math.cos(tilt)) * height
            };
        }

        function drawAtmosphere(time) {
            var dayCycle = time * 0.00008;
            var sunX = width * (0.5 + Math.sin(dayCycle) * 0.32);
            var sunY = height * (0.43 + Math.sin(dayCycle * 0.62 + 1.1) * 0.1);
            var radius = Math.max(width, height) * 0.78;
            var sunrise = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, radius);
            sunrise.addColorStop(0, 'rgba(255,190,130,0.105)');
            sunrise.addColorStop(0.34, 'rgba(255,163,117,0.045)');
            sunrise.addColorStop(1, 'rgba(255,150,110,0)');
            context.fillStyle = sunrise;
            context.fillRect(0, 0, width, height);

            var coolX = width - sunX * 0.72;
            var cool = context.createRadialGradient(coolX, height * 0.57, 0, coolX, height * 0.57, radius * 0.84);
            cool.addColorStop(0, 'rgba(80,174,255,0.09)');
            cool.addColorStop(0.5, 'rgba(48,125,255,0.035)');
            cool.addColorStop(1, 'rgba(48,125,255,0)');
            context.fillStyle = cool;
            context.fillRect(0, 0, width, height);
        }

        function contourOpacity(fieldIndex, ringIndex, field) {
            var edgeFade = 1 - ringIndex / (field.count + 2);
            var fieldWeight = fieldIndex < 2 ? 1 : 0.68;
            return (0.095 + edgeFade * 0.09) * fieldWeight;
        }

        function drawContour(field, fieldIndex, ringIndex, time) {
            var radius = 0.43 + ringIndex * 0.064;
            var segmentCount = 144;
            context.beginPath();

            for (var segment = 0; segment <= segmentCount; segment++) {
                var angle = segment / segmentCount * Math.PI * 2;
                var point = contourPoint(field, radius, angle, time);
                if (segment === 0) context.moveTo(point.x, point.y);
                else context.lineTo(point.x, point.y);
            }

            var sweep = 0.5 + Math.sin(time * 0.00007 + field.phase) * 0.31;
            var opacity = contourOpacity(fieldIndex, ringIndex, field);
            var gradient = context.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, 'rgba(' + field.color + ',' + (opacity * 0.4).toFixed(3) + ')');
            gradient.addColorStop(Math.max(0, sweep - 0.17), 'rgba(' + field.color + ',' + (opacity * 0.66).toFixed(3) + ')');
            gradient.addColorStop(sweep, 'rgba(255,235,206,' + (opacity * 1.5).toFixed(3) + ')');
            gradient.addColorStop(Math.min(1, sweep + 0.17), 'rgba(' + field.color + ',' + (opacity * 0.78).toFixed(3) + ')');
            gradient.addColorStop(1, 'rgba(' + field.color + ',' + (opacity * 0.36).toFixed(3) + ')');
            context.strokeStyle = gradient;
            context.lineWidth = ringIndex % 4 === 1 ? 1.25 : 0.9;
            context.stroke();
        }

        function paintContours(time) {
            context.lineCap = 'round';
            context.lineJoin = 'round';

            for (var fieldIndex = 0; fieldIndex < contourFields.length; fieldIndex++) {
                var field = contourFields[fieldIndex];
                for (var ringIndex = 0; ringIndex < field.count; ringIndex++) {
                    drawContour(field, fieldIndex, ringIndex, time);
                }
            }
        }

        function paintWaypoints(time) {
            for (var index = 0; index < contourFields.length; index++) {
                var field = contourFields[index];
                for (var waypointIndex = 0; waypointIndex < 3; waypointIndex++) {
                    var ringIndex = 2 + waypointIndex * 2;
                    var radius = 0.43 + ringIndex * 0.064;
                    var angle = time * (field.speed * 1.5) + field.phase + index * 1.9 + waypointIndex * Math.PI * 2 / 3;
                    var point = contourPoint(field, radius, angle, time);
                    if (point.x < -10 || point.x > width + 10 || point.y < -10 || point.y > height + 10) continue;

                    var glowRadius = 7 + waypointIndex * 0.7;
                    var glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, glowRadius);
                    glow.addColorStop(0, 'rgba(255,244,223,0.62)');
                    glow.addColorStop(0.18, 'rgba(255,214,160,0.32)');
                    glow.addColorStop(1, 'rgba(255,214,160,0)');
                    context.fillStyle = glow;
                    context.beginPath();
                    context.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
                    context.fill();
                    context.fillStyle = 'rgba(255,249,235,0.76)';
                    context.beginPath();
                    context.arc(point.x, point.y, 1.1, 0, Math.PI * 2);
                    context.fill();
                }
            }
        }

        function paintAerialField(time) {
            drawAtmosphere(time);
            paintContours(time);
            paintWaypoints(time);
        }

        function draw(time) {
            context.clearRect(0, 0, width, height);
            paintAerialField(time);
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
            prepareFields();
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
