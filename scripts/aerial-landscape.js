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

        // Soft, drifting landmasses suggest an aerial coastline without using
        // the rings, stars, or stroked paths that define the companion sites.
        var formations = [
            { x: -0.035, y: 0.55, rx: 0.22, ry: 0.28, phase: 0.4, speed: 0.9, driftX: 0.018, driftY: 0.012, shape: 0, light: 'rgba(91, 207, 222, 0.21)', deep: 'rgba(13, 69, 151, 0.10)', haze: 'rgba(56, 170, 209, 0.15)' },
            { x: 1.025, y: 0.50, rx: 0.23, ry: 0.29, phase: 2.2, speed: 0.72, driftX: 0.014, driftY: 0.016, shape: 1, light: 'rgba(71, 183, 220, 0.19)', deep: 'rgba(17, 62, 143, 0.12)', haze: 'rgba(45, 141, 207, 0.14)' },
            { x: 0.15, y: 1.04, rx: 0.23, ry: 0.29, phase: 4.1, speed: 0.63, driftX: 0.012, driftY: 0.009, shape: 2, light: 'rgba(72, 183, 205, 0.17)', deep: 'rgba(9, 45, 125, 0.15)', haze: 'rgba(30, 117, 190, 0.12)' },
            { x: 0.94, y: 0.92, rx: 0.20, ry: 0.27, phase: 5.5, speed: 0.52, driftX: 0.016, driftY: 0.011, shape: 0, light: 'rgba(224, 194, 126, 0.13)', deep: 'rgba(23, 75, 150, 0.12)', haze: 'rgba(220, 190, 122, 0.08)' }
        ];

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

        function traceLandmass(shape) {
            context.beginPath();
            if (shape === 1) {
                context.moveTo(-0.94, 0.04);
                context.bezierCurveTo(-0.88, -0.42, -0.54, -0.90, -0.12, -0.78);
                context.bezierCurveTo(0.22, -0.69, 0.46, -0.93, 0.82, -0.61);
                context.bezierCurveTo(1.18, -0.29, 0.94, 0.04, 0.77, 0.26);
                context.bezierCurveTo(0.51, 0.59, 0.18, 0.42, -0.09, 0.75);
                context.bezierCurveTo(-0.41, 1.02, -0.56, 0.53, -0.85, 0.38);
                context.bezierCurveTo(-1.10, 0.25, -1.13, 0.13, -0.94, 0.04);
            } else if (shape === 2) {
                context.moveTo(-1.00, -0.12);
                context.bezierCurveTo(-0.79, -0.57, -0.43, -0.70, -0.12, -0.91);
                context.bezierCurveTo(0.23, -1.12, 0.39, -0.59, 0.72, -0.58);
                context.bezierCurveTo(1.12, -0.56, 1.19, -0.21, 0.88, 0.08);
                context.bezierCurveTo(0.62, 0.33, 0.65, 0.70, 0.23, 0.79);
                context.bezierCurveTo(-0.14, 0.87, -0.34, 0.50, -0.69, 0.45);
                context.bezierCurveTo(-1.09, 0.39, -1.18, 0.10, -1.00, -0.12);
            } else {
                context.moveTo(-0.96, -0.08);
                context.bezierCurveTo(-0.91, -0.57, -0.50, -0.98, -0.06, -0.81);
                context.bezierCurveTo(0.34, -0.66, 0.43, -0.48, 0.83, -0.44);
                context.bezierCurveTo(1.22, -0.39, 1.14, 0.04, 0.78, 0.35);
                context.bezierCurveTo(0.46, 0.63, 0.12, 0.56, -0.15, 0.79);
                context.bezierCurveTo(-0.50, 1.00, -0.58, 0.51, -0.87, 0.33);
                context.bezierCurveTo(-1.15, 0.17, -1.14, 0.04, -0.96, -0.08);
            }
            context.closePath();
        }

        function paintFormation(form, time) {
            var drift = time * 0.00005 * form.speed + form.phase;
            var x = width * (form.x + Math.sin(drift) * form.driftX);
            var y = height * (form.y + Math.cos(drift * 0.83) * form.driftY);

            context.save();
            context.translate(x, y);
            context.rotate(Math.sin(drift * 0.7) * 0.025);
            context.scale(width * form.rx, height * form.ry);
            context.globalCompositeOperation = 'screen';

            var haze = context.createRadialGradient(-0.18, -0.16, 0.04, 0, 0, 1.65);
            haze.addColorStop(0, form.haze);
            haze.addColorStop(0.62, 'rgba(40, 117, 194, 0.035)');
            haze.addColorStop(1, 'rgba(40, 117, 194, 0)');
            traceLandmass(form.shape);
            context.fillStyle = haze;
            context.globalAlpha = 0.8;
            context.filter = 'blur(22px)';
            context.fill();
            context.filter = 'none';

            var surface = context.createLinearGradient(-0.9, -0.8, 0.9, 0.8);
            surface.addColorStop(0, form.light);
            surface.addColorStop(0.48, 'rgba(39, 119, 194, 0.10)');
            surface.addColorStop(1, form.deep);
            traceLandmass(form.shape);
            context.fillStyle = surface;
            context.globalAlpha = 0.7;
            context.fill();

            context.restore();
        }

        function draw(time) {
            context.clearRect(0, 0, width, height);
            paintAtmosphere(time);
            for (var i = 0; i < formations.length; i++) {
                paintFormation(formations[i], time);
            }
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
