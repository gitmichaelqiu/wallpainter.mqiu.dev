window.i18n = {
    en: {
        site: { title: 'WallPainter — Aerial Wallpapers for Every Space' },
        hero: { heading: 'WallPainter', tagline: 'Aerial wallpapers, set to your spaces.' },
        quicknav: {
            page: 'Page', links: 'Links', more: 'More Apps', workflowSuite: 'Workflow', mediaSuite: 'Media',
            overview: 'Overview', demo: 'Screenshots', features: 'Features', install: 'Install', docs: 'Details',
            github: 'GitHub', releases: 'Releases', raycast: 'Report an Issue', portfolio: 'mqiu.dev',
            blog: 'DesktopRenamer', optclicker: 'OptClicker', spaceswitcher: 'SpaceSwitcher'
        },
        overview: {
            label: 'Overview',
            headingHtml: 'A different atmosphere for every <span class="text-editorial gradient-text">space.</span>',
            body: 'WallPainter is a macOS menu bar app for Apple Aerial wallpapers. Set a Default rule for spaces without their own behavior, then add per-space rules where you want something different. Choose Manual, a fixed wallpaper, or follow Light and Dark appearance.'
        },
        demo: { label: 'At a Glance', watch: 'View settings screenshot', close: 'Close screenshot', screenshotAlt: 'WallPainter Spaces settings with per-space wallpaper behavior and Light and Dark previews.' },
        features: {
            label: 'Features', headingHtml: 'One default. Override only when it <span class="text-editorial gradient-text">matters.</span>',
            slide1num: '01 / Default', slide1title: 'Set a <span class="text-editorial gradient-text">default behavior</span>',
            slide1body: 'Choose Manual, Fixed wallpaper, or Follow system appearance. Spaces without an individual rule inherit the Default behavior.',
            slide2num: '02 / Spaces', slide2title: 'Choose behavior <span class="text-editorial gradient-text">space by space</span>',
            slide2body: 'Each space can use Default, stay Manual, use one fixed Aerial, or follow appearance with its own Light and Dark selections.',
            slide3num: '03 / Appearance', slide3title: 'Match macOS <span class="text-editorial gradient-text">Light and Dark</span>',
            slide3body: 'Choose a wallpaper for each appearance. When macOS changes appearance, WallPainter selects the matching image for each space-aware rule.',
            slide4num: '04 / Manual', slide4title: 'Keep wallpaper changes <span class="text-editorial gradient-text">in your hands</span>',
            slide4body: 'Manual rules are never changed automatically. Choose any installed Aerial and apply it to the current space or everywhere.',
            slide5num: '05 / Protection', slide5title: 'Protect your <span class="text-editorial gradient-text">mapped Aerials</span>',
            slide5body: 'Optional protection backs up only wallpapers used by your rules or current manual selection, then attempts to restore missing assets before automation.',
            slide5watch: 'View wallpaper library',
            slide6num: '06 / SpaceAPI', slide6title: 'Pause safely when a space is <span class="text-editorial gradient-text">unavailable</span>',
            slide6body: 'Per-space automation uses DesktopRenamer SpaceAPI. If the connection drops, WallPainter pauses space-aware changes rather than writing to the wrong desktop.',
            slide6btn: 'DesktopRenamer', slide6watch: 'View space settings'
        },
        moreFeatures: {
            apiLabel: 'DesktopRenamer SpaceAPI',
            apiBody: 'Per-space automation needs DesktopRenamer with SpaceAPI enabled in Settings → General. If SpaceAPI disconnects, WallPainter pauses space-aware changes. You can optionally enable a macOS notification in Permissions; it is off by default. Browsing wallpapers and manually applying one everywhere remain available without SpaceAPI.',
            docs: 'Visit DesktopRenamer',
            widgetLabel: 'Wallpaper protection',
            widgetBody: 'macOS manages downloaded Aerials and may remove assets that are no longer retained. When protection is enabled, WallPainter backs up only configured wallpapers and attempts to restore missing files. Restoration is best-effort; Apple provides no supported way to guarantee cache retention.'
        },
        install: {
            label: 'Install', headingHtml: 'Find the right view for every <span class="text-editorial" style="color: var(--gold-light); font-style: italic;">space.</span>',
            body: 'Requires macOS 15 Sequoia or later. Download WallPainter from GitHub Releases, move it to Applications, and open it.',
            download: 'Download from GitHub Releases', or: 'or', copy: 'View on GitHub',
            disclaimer: '<strong>Per-space automation requires DesktopRenamer with SpaceAPI enabled.</strong> WallPainter is distributed outside the Mac App Store and may show a first-open security warning. If macOS blocks it, use System Settings → Privacy &amp; Security → Open Anyway. Never disable SIP.'
        },
        companions: {
            label: 'More Apps', workflowSuite: 'Workflow', mediaSuite: 'Media',
            headingHtml: 'A small toolkit for a more <span class="text-editorial gradient-text">personal Mac.</span>',
            spaceswitcherTitle: 'SpaceSwitcher',
            spaceswitcherBody: 'Choose which apps and Dock items appear in each space, so your workspace can change with you.',
            optclickerTitle: 'OptClicker',
            optclickerBody: 'A small macOS utility that turns Option-click into a right-click.',
            vtplayerTitle: 'VTPlayer',
            vtplayerBody: 'Make video look sharper and move more smoothly on Mac and iPhone.',
            learnMore: 'Learn More'
        },
        footer: { copyright: '© 2026 - Michael Qiu.', brand: 'WallPainter.' },
        sidebar: { home: 'Home', overview: 'Overview', demo: 'Screenshots', features: 'Features', install: 'Install', companions: 'More Apps', github: 'GitHub' },
        sectionLabels: { home: 'Home', overview: 'Overview', demo: 'At a Glance', features: 'Features', 'more-features': 'Details', install: 'Install', companions: 'More Apps' }
    },
    zh: {
        site: { title: 'WallPainter — 为每个桌面设置航拍壁纸' },
        hero: { heading: 'WallPainter', tagline: '为每个桌面，搭配专属航拍壁纸。' },
        quicknav: {
            page: '页面', links: '链接', more: '更多应用', workflowSuite: '工作流', mediaSuite: '媒体',
            overview: '概览', demo: '截图', features: '功能', install: '安装', docs: '详细信息',
            github: 'GitHub', releases: '版本发布', raycast: '报告问题', portfolio: 'mqiu.dev',
            blog: 'DesktopRenamer', optclicker: 'OptClicker', spaceswitcher: 'SpaceSwitcher'
        },
        overview: {
            label: '概览',
            headingHtml: '为每个<span class="text-editorial gradient-text">桌面</span>营造不同氛围。',
            body: 'WallPainter 是一款用于 Apple 航拍壁纸的 macOS 菜单栏应用。先为没有单独规则的桌面设置默认行为，再按需为个别桌面添加规则。可选择手动、固定壁纸，或跟随明暗外观。'
        },
        demo: { label: '一览', watch: '查看设置截图', close: '关闭截图', screenshotAlt: 'WallPainter 空间设置，包含各桌面的壁纸行为和明暗预览。' },
        features: {
            label: '功能', headingHtml: '设置一个默认规则，只在需要时<span class="text-editorial gradient-text">单独调整。</span>',
            slide1num: '01 / 默认规则', slide1title: '设定<span class="text-editorial gradient-text">默认行为</span>',
            slide1body: '可选手动、固定壁纸或跟随系统外观。没有单独规则的桌面会继承默认行为。',
            slide2num: '02 / 桌面规则', slide2title: '为每个桌面<span class="text-editorial gradient-text">分别选择</span>',
            slide2body: '每个桌面都可以使用默认规则、保持手动、使用固定航拍壁纸，或设置自己的明暗壁纸。',
            slide3num: '03 / 明暗外观', slide3title: '匹配 macOS <span class="text-editorial gradient-text">明暗外观</span>',
            slide3body: '为每种外观选择壁纸。macOS 外观改变时，WallPainter 会为每个可识别的桌面选择对应图片。',
            slide4num: '04 / 手动控制', slide4title: '壁纸更改<span class="text-editorial gradient-text">由你掌控</span>',
            slide4body: '手动规则不会自动更改壁纸。你仍可选择已安装的航拍壁纸，并应用到当前桌面或所有桌面。',
            slide5num: '05 / 壁纸保护', slide5title: '保护<span class="text-editorial gradient-text">已映射的航拍壁纸</span>',
            slide5body: '启用可选保护后，应用只备份规则或当前手动选择所引用的壁纸，并尝试在自动切换前恢复缺失资源。',
            slide5watch: '查看壁纸库',
            slide6num: '06 / SpaceAPI', slide6title: '桌面信息不可用时<span class="text-editorial gradient-text">安全暂停</span>',
            slide6body: '按桌面自动切换需要 DesktopRenamer SpaceAPI。连接中断时，WallPainter 会暂停桌面相关更改，避免误改其他桌面。',
            slide6btn: 'DesktopRenamer', slide6watch: '查看桌面设置'
        },
        moreFeatures: {
            apiLabel: 'DesktopRenamer SpaceAPI',
            apiBody: '按桌面自动切换需要在 DesktopRenamer 的“设置 → 通用”中启用 SpaceAPI。连接中断时，WallPainter 会暂停桌面相关更改。你可以在“权限”中选择开启 macOS 断连通知，默认关闭。即使没有 SpaceAPI，仍可浏览壁纸并手动应用到所有桌面。',
            docs: '访问 DesktopRenamer',
            widgetLabel: '壁纸保护',
            widgetBody: 'macOS 管理已下载的航拍壁纸，也可能移除长期未保留的资源。启用保护后，WallPainter 只备份规则引用的壁纸，并尝试恢复缺失文件。恢复能力仅为尽力而为；Apple 没有提供可保证缓存不被清理的公开接口。'
        },
        install: {
            label: '安装', headingHtml: '为每个<span class="text-editorial" style="color: var(--gold-light); font-style: italic;">桌面</span>找到合适风景。',
            body: '需要 macOS 15 Sequoia 或更高版本。从 GitHub Releases 下载 WallPainter，移至“应用程序”文件夹后打开。',
            download: '从 GitHub Releases 下载', or: '或', copy: '查看 GitHub',
            disclaimer: '<strong>按桌面自动切换需要启用 DesktopRenamer SpaceAPI。</strong>WallPainter 在 Mac App Store 之外分发，首次打开时 macOS 可能显示安全提示。如被阻止，请前往“系统设置 → 隐私与安全性 → 仍要打开”。请勿关闭 SIP。'
        },
        companions: {
            label: '更多应用', workflowSuite: '工作流', mediaSuite: '媒体',
            headingHtml: '让 Mac 更贴合你的<span class="text-editorial gradient-text">使用方式。</span>',
            spaceswitcherTitle: 'SpaceSwitcher',
            spaceswitcherBody: '为不同桌面选择显示哪些应用和程序坞项目，让工作区随你切换。',
            optclickerTitle: 'OptClicker',
            optclickerBody: '一款简洁的 macOS 工具，让 Option-单击变成右键单击。',
            vtplayerTitle: 'VTPlayer',
            vtplayerBody: '让 Mac 和 iPhone 上的视频细节更清晰、播放更流畅。',
            learnMore: '了解更多'
        },
        footer: { copyright: '© 2026 - Michael Qiu.', brand: 'WallPainter.' },
        sidebar: { home: '首页', overview: '概览', demo: '截图', features: '功能', install: '安装', companions: '更多应用', github: 'GitHub' },
        sectionLabels: { home: '首页', overview: '概览', demo: '一览', features: '功能', 'more-features': '详细信息', install: '安装', companions: '更多应用' }
    }
};
