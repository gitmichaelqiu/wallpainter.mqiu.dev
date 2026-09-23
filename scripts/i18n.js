window.i18n = {
    en: {
        site: { title: 'WallPainter — Aerial Wallpapers for Every Space' },
        hero: { heading: 'WallPainter', tagline: 'Aerial wallpapers, set to your spaces.' },
        quicknav: {
            page: 'Page', links: 'Links', more: 'More Apps', workflowSuite: 'Workflow', mediaSuite: 'Media',
            overview: 'Overview', demo: 'How It Works', features: 'Features', requirements: 'Getting Started', install: 'Get WallPainter', apps: 'More Apps',
            github: 'GitHub', releases: 'Releases', issues: 'Report an Issue', website: 'mqiu.dev'
        },
        overview: {
            label: 'Overview',
            headingHtml: 'A different atmosphere for <span class="text-editorial gradient-text">every space.</span>',
            body: 'WallPainter is a macOS menu bar app for Apple Aerial wallpapers. Choose a default behavior for your desktops, follow Light and Dark appearance, and give individual spaces their own rules when you want.'
        },
        demo: {
            label: 'At a Glance',
            headingHtml: 'See the rule. See the <span class="text-editorial gradient-text">wallpaper.</span>',
            body: 'Configure wallpaper behavior per space, preview the Light and Dark choices, and keep manual wallpaper controls close by.',
            spacesTitle: 'Space Behavior', spacesAlt: 'WallPainter Spaces settings with per-space wallpaper behavior and Light and Dark previews.',
            generalTitle: 'Your Aerial Library', generalAlt: 'WallPainter General settings showing installed Aerial wallpapers and wallpaper protection.'
        },
        features: {
            label: 'Features',
            headingHtml: 'Set a rule once. Make each <span class="text-editorial gradient-text">space feel right.</span>',
            defaultTitle: 'One clear default',
            defaultBody: 'Choose Manual, Fixed wallpaper, or Follow system appearance. The Default rule is the fallback for spaces without their own rule.',
            spacesTitle: 'Overrides only where needed',
            spacesBody: 'A space can use Default, stay Manual, use one fixed Aerial, or follow appearance with its own Light and Dark selections.',
            appearanceTitle: 'Follow macOS appearance',
            appearanceBody: 'Select a Light and Dark Aerial for an appearance rule. WallPainter updates the wallpaper when macOS changes appearance.',
            manualTitle: 'Manual when you prefer',
            manualBody: 'Manual rules are never changed automatically. You can still choose an installed Aerial and apply it to the current space or everywhere.',
            protectionTitle: 'Keep mapped Aerials protected',
            protectionBody: 'Optional wallpaper protection backs up only wallpapers referenced by your rules or current manual selection, then attempts to restore missing assets.',
            spaceAPITitle: 'Space-aware, not guesswork',
            spaceAPIBody: 'DesktopRenamer SpaceAPI supplies the current space information. If the connection is unavailable, automatic space-based changes pause instead of writing to the wrong desktop.'
        },
        moreFeatures: {
            label: 'Before You Automate',
            headingHtml: 'A few things to know <span class="text-editorial gradient-text">before getting started.</span>',
            requirementLabel: 'System requirement',
            requirementBody: 'WallPainter requires macOS 15 Sequoia or later. No System Integrity Protection changes are needed.',
            spaceAPILabel: 'DesktopRenamer SpaceAPI',
            spaceAPIBody: 'Per-space automation needs DesktopRenamer with SpaceAPI enabled in its Settings → General. Browsing Aerials and manually applying one everywhere remain available without it.',
            disconnectLabel: 'Connection recovery',
            disconnectBody: 'Space-aware changes pause when SpaceAPI disconnects. In Permissions, you can optionally turn on a macOS notification for a dropped connection; it is off by default.',
            aerialLabel: 'Apple Aerial downloads',
            aerialBody: 'WallPainter uses Aerials downloaded by macOS. If protection is enabled, it keeps backups for configured wallpapers and best-effort restores evicted assets.'
        },
        install: {
            label: 'Get WallPainter',
            headingHtml: 'Find the right view <span class="text-editorial" style="color: var(--gold-light); font-style: italic;">for every space.</span>',
            body: 'Download WallPainter from GitHub Releases, move it to Applications, then choose a Default rule or start with manual wallpaper control.',
            download: 'View GitHub Releases',
            prerequisite: 'For per-space automation, install DesktopRenamer and enable SpaceAPI in its Settings → General.',
            gatekeeper: 'WallPainter is distributed outside the Mac App Store and may show a first-open security warning. If macOS blocks it, use System Settings → Privacy & Security → Open Anyway. Never disable SIP.'
        },
        companions: {
            label: 'More Apps', workflowSuite: 'Workflow', mediaSuite: 'Media',
            headingHtml: 'A small toolkit for a more <span class="text-editorial gradient-text">personal Mac.</span>',
            desktoprenamerTitle: 'DesktopRenamer',
            desktoprenamerBody: 'Name and organize macOS spaces. Its SpaceAPI provides the desktop information WallPainter needs for per-space rules.',
            spaceswitcherTitle: 'SpaceSwitcher',
            spaceswitcherBody: 'Choose which apps and Dock items appear in each space, so your workspace can change with you.',
            optclickerTitle: 'OptClicker',
            optclickerBody: 'A small macOS utility that turns Option-click into a right-click.',
            vtplayerTitle: 'VTPlayer',
            vtplayerBody: 'Make video look sharper and move more smoothly on Mac and iPhone.',
            learnMore: 'Learn More'
        },
        footer: { copyright: '© 2026 - Michael Qiu.', brand: 'WallPainter.' },
        sidebar: { home: 'Home', overview: 'Overview', demo: 'How It Works', features: 'Features', install: 'Get WallPainter', companions: 'More Apps', github: 'GitHub' },
        sectionLabels: { home: 'Home', overview: 'Overview', demo: 'How It Works', features: 'Features', 'more-features': 'Getting Started', install: 'Get WallPainter', companions: 'More Apps' },
        nav: { backToTop: 'Back to top', menu: 'Open menu', switchLight: 'Switch to light mode', switchDark: 'Switch to dark mode', switchSystem: 'Switch to system theme' }
    },
    zh: {
        site: { title: 'WallPainter — 为每个桌面设置动态壁纸' },
        hero: { heading: 'WallPainter', tagline: '让每个桌面，都有专属的 Aerial 壁纸。' },
        quicknav: {
            page: '页面', links: '链接', more: '更多应用', workflowSuite: '工作流', mediaSuite: '媒体',
            overview: '概览', demo: '工作方式', features: '功能', requirements: '开始前须知', install: '获取 WallPainter', apps: '更多应用',
            github: 'GitHub', releases: '版本发布', issues: '报告问题', website: 'mqiu.dev'
        },
        overview: {
            label: '概览',
            headingHtml: '为<span class="text-editorial gradient-text">每个桌面</span>营造不同氛围。',
            body: 'WallPainter 是一款用于 Apple Aerial 动态壁纸的 macOS 菜单栏应用。设置适用于所有桌面的默认行为，让壁纸跟随明暗外观切换，也可以为特定桌面单独设置规则。'
        },
        demo: {
            label: '一览',
            headingHtml: '规则清晰，壁纸效果<span class="text-editorial gradient-text">一目了然。</span>',
            body: '按桌面配置壁纸行为，预览明暗外观下的壁纸，并随时手动选择和应用。',
            spacesTitle: '桌面行为', spacesAlt: 'WallPainter 的桌面设置，显示每个桌面的壁纸行为以及明暗壁纸预览。',
            generalTitle: '你的 Aerial 图库', generalAlt: 'WallPainter 的通用设置，显示已安装的 Aerial 壁纸和壁纸保护选项。'
        },
        features: {
            label: '功能',
            headingHtml: '设置一条规则，让每个<span class="text-editorial gradient-text">桌面恰到好处。</span>',
            defaultTitle: '清晰的默认规则',
            defaultBody: '可选择手动、固定壁纸或跟随系统外观。没有单独规则的桌面会使用默认规则。',
            spacesTitle: '只为需要的桌面添加覆盖规则',
            spacesBody: '每个桌面都可以使用默认规则、保持手动、使用固定 Aerial，或单独设置跟随外观时的明暗壁纸。',
            appearanceTitle: '跟随 macOS 外观',
            appearanceBody: '为外观规则分别选择明亮和暗色 Aerial。macOS 外观切换时，WallPainter 会相应更新壁纸。',
            manualTitle: '也可以完全手动',
            manualBody: '手动规则不会被自动更改。你仍可以选择已安装的 Aerial，并将其应用到当前桌面或所有桌面。',
            protectionTitle: '保护规则使用的 Aerial',
            protectionBody: '可选的壁纸保护只备份规则或当前手动选择所引用的壁纸，并会尝试恢复缺失的资源。',
            spaceAPITitle: '按桌面应用，不靠猜测',
            spaceAPIBody: 'WallPainter 通过 DesktopRenamer SpaceAPI 获取当前桌面信息。连接不可用时，会暂停按桌面自动更换，而不会将壁纸错误地应用到其他桌面。'
        },
        moreFeatures: {
            label: '开始前须知',
            headingHtml: '开始使用前，先了解<span class="text-editorial gradient-text">几件事。</span>',
            requirementLabel: '系统要求',
            requirementBody: 'WallPainter 需要 macOS 15 Sequoia 或更高版本，无需更改系统完整性保护（SIP）。',
            spaceAPILabel: 'DesktopRenamer SpaceAPI',
            spaceAPIBody: '按桌面自动化需要安装 DesktopRenamer，并在其“设置”→“通用”中启用 SpaceAPI。没有 SpaceAPI 时，仍可浏览 Aerial 并手动应用到所有桌面。',
            disconnectLabel: '连接恢复',
            disconnectBody: 'SpaceAPI 断开时，按桌面自动更换会暂停。你可以在“权限”中选择开启连接中断通知；此选项默认关闭。',
            aerialLabel: 'Apple Aerial 下载',
            aerialBody: 'WallPainter 使用 macOS 下载的 Aerial。启用保护后，应用会备份已配置的壁纸，并尽力恢复被系统清理的资源。'
        },
        install: {
            label: '获取 WallPainter',
            headingHtml: '为每个桌面，找到<span class="text-editorial" style="color: var(--gold-light);">恰好的风景。</span>',
            body: '从 GitHub Releases 下载 WallPainter，将它移入“应用程序”，然后设置默认规则或直接手动应用壁纸。',
            download: '查看 GitHub 版本发布',
            prerequisite: '如需按桌面自动更换，请安装 DesktopRenamer，并在“设置”→“通用”中启用 SpaceAPI。',
            gatekeeper: 'WallPainter 通过 Mac App Store 以外的方式分发，首次打开时 macOS 可能会显示安全提示。如被阻止，请前往“系统设置”→“隐私与安全性”→“仍要打开”。无需关闭 SIP。'
        },
        companions: {
            label: '更多应用', workflowSuite: '工作流', mediaSuite: '媒体',
            headingHtml: '让 Mac 更符合你习惯的<span class="text-editorial gradient-text">实用工具。</span>',
            desktoprenamerTitle: 'DesktopRenamer',
            desktoprenamerBody: '为 macOS 桌面命名和整理。WallPainter 通过它的 SpaceAPI 获取按桌面设置规则所需的信息。',
            spaceswitcherTitle: 'SpaceSwitcher',
            spaceswitcherBody: '按桌面控制哪些应用和程序坞项目显示，让工作环境随桌面切换。',
            optclickerTitle: 'OptClicker',
            optclickerBody: '一款轻巧的 macOS 工具：按住 Option 并点击即可执行右键。',
            vtplayerTitle: 'VTPlayer',
            vtplayerBody: '在 Mac 和 iPhone 上提升视频画质，让细节更清晰、运动更流畅。',
            learnMore: '了解更多'
        },
        footer: { copyright: '© 2026 - Michael Qiu.', brand: 'WallPainter.' },
        sidebar: { home: '首页', overview: '概览', demo: '工作方式', features: '功能', install: '获取 WallPainter', companions: '更多应用', github: 'GitHub' },
        sectionLabels: { home: '首页', overview: '概览', demo: '工作方式', features: '功能', 'more-features': '开始前须知', install: '获取 WallPainter', companions: '更多应用' },
        nav: { backToTop: '返回顶部', menu: '打开菜单', switchLight: '切换到浅色模式', switchDark: '切换到深色模式', switchSystem: '切换到系统外观' }
    }
};
