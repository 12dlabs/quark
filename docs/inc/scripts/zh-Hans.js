/*  --------------------
 *  Language pack for zh-Hans - Quark online - Alibaba
 *  (c) Kingcean Tuan, 2015.
 *
 *  File  zh-Hans.ts
 *  Description  Language pack for zh-Hans.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Main;
    (function (Main) {
        function template(template) {
            var res = {
                name: "Quark",
                hmpgFile: "zh-Hans",
                controlFile: "control-zh-Hans",
                mvvmFile: "mvvm-zh-Hans",
                localizationFile: "localization-zh-Hans",
                intro: "简介",
                tutorial: "快速开始",
                reference: "API 指南",
                definition: "定义",
                usages: "用法",
                membersInfo: "成员属性和方法",
                optionsInfo: "选项信息",
                samples: "示例",
                demo: "演示",
                releaseNotes: "更新日志",
                type: "类型",
                db: "数据库",
                data: "数据",
                stream: "流",
                file: "文件",
                object: "对象",
                text: "文本",
                datetime: "日期与时间",
                collection: "集合",
                list: "列表",
                table: "表格",
                tabs: "选项卡",
                web: "网络",
                network: "网络",
                elements: "DOM 元素",
                graph: "图形",
                image: "图像",
                picture: "图片",
                photo: "照片",
                chart: "图表",
                media: "多媒体",
                camera: "相机",
                audio: "音频",
                video: "视频",
                panels: "面板",
                reflection: "反射",
                observable: "绑定",
                binding: "绑定",
                diagnostics: "诊断",
                utilities: "工具",
                localization: "本地化",
                globalization: "全球化",
                template: "模板",
                advanced: "高级",
                goThrough: "入门",
                emvvm: "增强型 MVVM",
                introControl: "控件入门",
                tdlabs: "第12维实验室",
                ape: "猿来如此",
                oref: "外部引用",
                controlClassDeclare: "类声明",
                controlOptionsDeclare: "选项信息接口名",
                controlFactoryDeclare: "工厂声明",
                usagesJs: "你可以在 JavaScript 中，通过绑定一个 DOM 元素，可以直接创建并获取该控件的实例，方便之后的访问。",
                usagesJs2: "你可以在 JavaScript 中，通过绑定一个 DOM 元素，可以直接初始化一个该控件的实例，方便之后的访问。",
                usagesWebC: "该控件支持 Web Component。可以直接对该 DOM 的 {0} 属性设置选项信息或其生成方法，Quark 会自动加载。",
                usagesWebC2: "该控件也支持 Web Component。",
                usagesFlipper: "对于 Flipper 用户，你可以基于该控件类创建一个 Web Component 以便于复用。",
                seeCommentDoc: "请通过 IDE 或相关工具查看 {0} 的代码注释文档。",
                workWithFlipper: "对 Flipper 进行扩展",
                prereleased: "提醒：当前站点为预览版，这意味着其中的内容可能会在未经提醒的情况下，随时进行修改。"
            };
            template.strings.reg("zh-Hans", res);
            template.strings.reg("zh-CN", res);
            template.strings.reg("zh-SG", res);
            return template;
        }
        Main.template = template;
    })(Main || (Main = {}));
    return Main;
});
