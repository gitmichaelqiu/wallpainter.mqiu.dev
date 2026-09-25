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
        var landscapes = [
            { base: 0.43, spacing: 0.026, bands: 4, type: 'ridge', phase: 0.35, speed: 0.64 },
            { base: 0.82, spacing: 0.036, bands: 4, type: 'shore', phase: 1.55, speed: 0.7 }
        ];

        function ridgeHeight(position, band, landscape, time) {
            var phase = time * 0.00022 * landscape.speed + landscape.phase;
            var drift = Math.sin(phase) * 0.022;
            var peakOne = Math.exp(-Math.pow((position - (0.12 + drift)) / 0.075, 2));
            var peakTwo = Math.exp(-Math.pow((position - (0.34 - drift * 0.7)) / 0.115, 2));
            var peakThree = Math.exp(-Math.pow((position - (0.66 + drift * 0.6)) / 0.105, 2));
            var peakFour = Math.exp(-Math.pow((position - (0.87 - drift)) / 0.07, 2));
            var ridgeDetail = Math.sin(position * 18 + phase) * 0.012 +
                Math.sin(position * 41 - phase * 0.72) * 0.004;
            var bandOffset = (band - (landscape.bands - 1) * 0.5) * landscape.spacing;

            return landscape.base + bandOffset -
                peakOne * 0.085 - peakTwo * 0.058 - peakThree * 0.075 - peakFour * 0.052 + ridgeDetail;
        }

        function shoreHeight(position, band, landscape, time) {
            var phase = time * 0.0003 * landscape.speed + landscape.phase;
            var drift = Math.sin(phase * 0.72) * 0.025;
            var bayOne = Math.exp(-Math.pow((position - (0.19 + drift)) / 0.13, 2));
            var bayTwo = Math.exp(-Math.pow((position - (0.82 - drift)) / 0.16, 2));
            var longSwell = Math.sin(position * Math.PI * 2.1 + phase) * 0.035;
            var inlet = Math.sin(position * Math.PI * 5.1 - phase * 0.68) * 0.012;
            var bandOffset = (band - (landscape.bands - 1) * 0.5) * landscape.spacing;

            return landscape.base + bandOffset + longSwell + inlet + bayOne * 0.016 + bayTwo * 0.012;
        }

        function landscapeStroke(opacity) {
            var stroke = context.createLinearGradient(0, 0, width, 0);
            var fade = [
                [0, 0.88], [0.22, 0.92], [0.36, 0.82], [0.5, 0.72],
                [0.64, 0.82], [0.78, 0.92], [1, 0.88]
            ];

            for (var stopIndex = 0; stopIndex < fade.length; stopIndex++) {
                var stop = fade[stopIndex];
                stroke.addColorStop(stop[0], 'rgba(255, 255, 255, ' + (opacity * stop[1]).toFixed(3) + ')');
            }
            return stroke;
        }

        function paintLandscape(time) {
            context.lineCap = 'round';
            context.lineJoin = 'round';

            for (var landscapeIndex = 0; landscapeIndex < landscapes.length; landscapeIndex++) {
                var landscape = landscapes[landscapeIndex];
                var startX = -width * 0.02;
                var endX = width * 1.02;
                var sampleCount = Math.max(80, Math.ceil((endX - startX) / 3));

                for (var band = 0; band < landscape.bands; band++) {
                    context.beginPath();

                    for (var sample = 0; sample <= sampleCount; sample++) {
                        var position = sample / sampleCount;
                        var x = startX + (endX - startX) * position;
                        var normalizedY = landscape.type === 'ridge'
                            ? ridgeHeight(position, band, landscape, time)
                            : shoreHeight(position, band, landscape, time);
                        var y = height * normalizedY;

                        if (sample === 0) context.moveTo(x, y);
                        else context.lineTo(x, y);
                    }

                    var distanceFromCenter = Math.abs(band - (landscape.bands - 1) * 0.5) / landscape.bands;
                    var opacity = 0.23 * (1 - distanceFromCenter * 0.3);
                    context.strokeStyle = landscapeStroke(opacity);
                    context.lineWidth = 1.1;
                    context.stroke();
                }
            }
        }

        function draw(time) {
            context.clearRect(0, 0, width, height);
            paintLandscape(time);
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
