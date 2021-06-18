/*  --------------------
 *  Media - Alibaba
 *  (c) Kingcean Tuan, 2014.
 *
 *  File  media.ts
 *  Description  Multiple media library.
 *  Owner  Kingcean Tuan <kingcean@live.com>
 *  --------------------  */

/// <reference path="common.ts" />

namespace AliHub.Media {

    /**
      * Audio control options.
      */
    export interface AudioControlOptionsContract extends Common.VisualControlOptionsContract<AudioControl> {

        /**
          * Template source type.
          */
        templateType?: string;

        /**
          * Template source value.
          */
        template?: string;

        /**
          * Text diplayed when the browser does not support.
          */
        unsupportedText: string;
    }

    /**
      * Audio key point.
      */
    export interface AudioKeyPointContract {

        /**
          * The time.
          */
        time: number;

        /**
          * The note.
          */
        note?: string;

    }

    /**
      * Audio client.
      */
    export interface AudioClientContract {

        /**
          * Gets the earliest possible position, in seconds, that the playback can begin.
          */
        initialTime(): number;

        /**
          * Gets ready state.
          */
        readyState(): any;

        /**
          * Gets a flag of auto buffer enabled.
          */
        autobuffer(): boolean;

        /**
          * Gets or sets a flag to specify whether playback should restart after it completes.
          */
        loop(value?: boolean): boolean;

        /**
          * Gets information about whether the playback has ended or not.
          */
        ended(): boolean;

        /**
          * Gets a collection of buffered time ranges.
          */
        buffered(): TimeRanges;

        /**
          * Pauses the current playback and sets paused to TRUE. This can be used to test whether the media is playing or paused. You can also use the pause or play events to tell whether the media is playing or not.
          */
        pause(): void;

        /**
          * Gets a flag that specifies whether playback is paused.
          */
        paused(): boolean;

        /**
          * Loads and starts playback of a media resource.
          */
        play(): void;

        /**
          * Occurs on played.
          */
        played: Collection.EventHandlers<boolean>;

        /**
          * Occurs on loaded.
          */
        loaded: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;

        /**
          * Returns an object representing the current error state of the audio or video element.
          */
        error(): MediaError;

        /**
          * Returns a TimeRanges object that represents the ranges of the current media resource that can be seeked.
          */
        seekable(): TimeRanges;

        /**
          * Gets or sets a value that indicates whether to start playing the media automatically.
          */
        autoplay(value?: boolean): boolean;

        /**
          * Gets or sets the preload mode.
          */
        preload(value?: string): string;

        /**
          * Gets or sets the volume level for audio portions of the media element.
          */
        volume(value?: number): number;

        /**
          * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of the normal speed of the media resource.
          */
        playbackRate(value?: number): number;

        /**
          * Returns the duration in seconds of the current media resource. A NaN value is returned if duration is not available, or Infinity if the media resource is streaming.
          */
        duration(): number;

        /**
          * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
          */
        muted(value?: boolean): boolean;

        /**
          * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio resource.
          */
        defaultPlaybackRate(value?: number): number;

        /**
          * Returns a string that specifies whether the client can play a given media resource type.
          */
        canPlayType(type: string): string;

        /**
          * Gets a flag that indicates whether the the client is currently moving to a new playback position in the media resource.
          */
        seeking(): boolean;

        /**
          * Gets or sets the current playback position, in seconds.
          */
        currentTime(value?: number): number;

        /**
          * Gets or sets the name of the sound.
          */
        name: Common.BindingObjectContract<string>;

        /**
          * Gets or sets the album name of the sound.
          */
        album: Common.BindingObjectContract<string>;

        /**
          * Gets or sets the artist name of the sound.
          */
        artist: Common.BindingObjectContract<string>;

        /**
          * Key points in second.
          */
        keypoints: Collection.BindingArrayContract<AudioKeyPointContract>;

        /**
          * Sets an audio file to play.
          */
        sound(path: string, mime: string): Collection.StringPropertiesContract;

        /**
          * Sets the audio to play with multiple files for different type supports.
          */
        soundSet(value?: Collection.KeyValuePairContract<string, string>[]): Collection.KeyValuePairContract<string, string>[];

        /**
          * Checks whether it contain specific audio file path. 
          */
        contain(path: string): boolean;

        /**
          * Clears. 
          */
        clear(): void;

        /**
          * Occurs when audio is changed.
          */
        changed: Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>;

        /**
          * Gets or sets the additional data model of the sound.
          */
        model(value?: any): any;

        /**
          * Properties.
          */
        [key: string]: any;

    }

    /**
      * Camera captured event information.
      */
    export interface CameraCapturedInfoContract {
        image: (styleRef?: string) => Graph.ImageContract;
        captured: Date;
        download: () => void;
        size: Common.PlaneCoordinate;
    }

    /**
      * Camera control options.
      */
    export interface CameraControlOptionsContract extends Common.VisualControlOptionsContract<CameraControl> {
        /**
          * Width of camera view.
          */
        viewWidth?: number;

        /**
          * Height of camera view.
          */
        viewHeight?: number;

        /**
          * Occurs after photo captured.
          */
        captured?: Common.Action1<CameraCapturedInfoContract>;

        /**
          * File name prefix.
          */
        filePrefix?: string;

        /**
          * The data model convertor for photo captured item.
          */
        photoModelConvert?(entry: CameraCapturedInfoContract): any;

        /**
          * Template source value for photo captured item.
          */
        photoTemplate?: string;

        /**
          * Template source type for photo captured item.
          */
        photoTemplateType?: string;

        /**
          * The data model for not support.
          */
        notSupportModel?: any;

        /**
          * Template source value for not support.
          */
        notSupportTemplate?: string;

        /**
          * Template source type for not support.
          */
        notSupportTemplateType?: string;

        /**
          * Failed load.
          */
        failedLoad?: Common.Action;

        /**
          * A value indicating whether not load immediately.
          */
        lazyLoad?: boolean;

        /**
          * A value indicating whether the photos captured is desc.
          */
        isDesc?: boolean;
    }

    /**
      * Audio control.
      */
    export class AudioControl extends Common.VisualControl {

        private _paths: Collection.KeyValuePairContract<string, string>[] = [];

        private _audio: HTMLAudioElement;

        private _text: string;

        private _client: AudioClientContract;

        private _bindings: Common.BindingControl<any>;

        private _audioCtx: AudioContext;

        /**
          * Initializes a new instance of the AudioControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones. 
          */
        constructor(id: Common.VisualControlElementContract) {
            super(id);

            this.addStyleRef("ali-controls-audio");
            var vEle = document.createElement("div");
            vEle.id = this.getId() + "_v";
            vEle.style.display = "none";
            this.appendElement(vEle);
            this._renew();
            if (!!(window as any).AudioContext || !!(window as any).webkitAudioContext) this._audioCtx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        }

        /**
          * Gets or sets the name of the sound.
          */
        public name = Common.bindingObj<string>();

        /**
          * Gets or sets the album name of the sound.
          */
        public album = Common.bindingObj<string>();

        /**
          * Gets or sets the artist name of the sound.
          */
        public artist = Common.bindingObj<string>();

        /**
          * Gets or sets the additional data model of the sound.
          */
        public model = Common.bindingObj<any>();

        /**
          * Key points. 
          */
        public keypoints = AliHub.Collection.bindingArray<AudioKeyPointContract>()

        /**
          * Occurs when the audio is loaded. 
          */
        public voiceLoaded = new Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>();

        /**
          * Occurs when it plays or pauses. 
          */
        public played = new Collection.EventHandlers<boolean>();

        /**
          * Checks whether it contain specific audio file path. 
          */
        public contain(path: string): boolean {
            return this._paths.some((ele, i, arr) => {
                return path === ele.key;
            });
        }

        /**
          * Gets player client. 
          */
        public client(): AudioClientContract {
            this._initClient();
            return this._client;
        }

        /**
          * Changes a sound file.
          */
        public sound(path: string, mime: string) {
            return this.soundSet([{ key: path, value: mime }]);
        }

        /**
          * Changes sound files.
          */
        public soundSet(value?: Collection.StringPropertiesContract, loadImmediately = false): Collection.StringPropertiesContract {
            if (arguments.length > 0) {
                this.keypoints(null);
                var autoplay = this._audio.autoplay;
                var preload = this._audio.preload;
                try {
                    if (!!this._paths && this._paths.length > 0) {
                        this._audio.pause();
                        this._audio.currentTime = 0;
                    }
                } catch (ex) { }
                try {
                    this._audio.outerHTML = "";
                } catch (ex) { }
                this._paths = [];
                this._renew();
                if (!!value) value.forEach((ele, i, arr) => {
                    var sourceEle = document.createElement("source");
                    sourceEle.setAttribute("src", ele.key);
                    sourceEle.setAttribute("type", ele.value);
                    this._audio.appendChild(sourceEle);
                    this._paths.push(ele);
                });

                if (loadImmediately && !!this._audio.load) this._audio.load();
                if (autoplay != null) this._audio.autoplay = autoplay;
                if (preload != null) this._audio.preload = preload;
                var errText = document.createElement("div");
                errText.innerHTML = this._text;
                this._audio.appendChild(errText);
            }

            var col = [];
            this._paths.forEach((ele, i, arr) => {
                col.push(ele.key);
            });
            return col;
        }

        /**
          * Gets or sets unsupported text displayed. 
          */
        public unsupportedText(str?: string): string {
            if (arguments.length > 0) this._text = str;
            return this._text;
        }

        /**
          * Loads specific options.
          * @param value  The options to load. 
          */
        public loadOptions(value: AudioControlOptionsContract | boolean): any {
            var options: AudioControlOptionsContract = super.loadOptions(value);
            if (!options) return null;
            if (!!options.unsupportedText) this.unsupportedText(options.unsupportedText.toString());
            if (!options.ignoreParts) this.set_template("initpart", null);
            this.set_template(options.templateType, options.template);
            return options;
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public set_template(valueType: string, value: string) {
            if ((valueType == null && value == null) || !Elements.getById(this.getId(), "v")) return;
            var vEle = this.getChildElement(true, "v");
            this._bindingControl();
            this._bindings.bindViewModel(this.model);
            this._bindings.info(this.client());
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._bindings.setTemplate(valueType, value);
            vEle.style.display = "";
            this._audio.style.display = "none";
        }

        /**
          * Adds an extender.
          * @param value  The extender instance. 
          */
        public addExtender(value: Common.BindingControlExtender<AudioClientContract>): void {
            this._bindingControl().addExtender(value);
        }

        /**
          * Removes a specific extender.
          * @param name  The extender name. 
          */
        public removeExtender(name: string): void {
            this._bindingControl().removeExtender(name);
        }

        /**
          * Clears all extenders registered. 
          */
        public clearExtenders(): void {
            this._bindingControl().clearExtenders();
        }

        /**
          * Plays. 
          */
        public play() {
            if (!this._paths || !this._audio) return;
            this._audio.play();
        }

        /**
          * Pauses. 
          */
        public pause() {
            if (!this._paths || !this._audio || this._paths.length === 0) return;
            this._audio.pause();
        }

        /**
          * Checks if the player is paused. 
          */
        public paused = (): boolean => {
            return this._audio.paused;
        }

        /**
          * Gets or sets a value indicating whether it is autoplay. 
          */
        public autoplay = (value?: boolean): boolean => {
            if (typeof value !== "undefined" && value !== void 0) this._audio.autoplay = value;
            return this._audio.autoplay;
        }

        /**
          * Gets or sets volume. 
          */
        public volume = (value?: number): number => {
            if (typeof value !== "undefined" && value !== void 0) this._audio.volume = value;
            return this._audio.volume;
        }

        /**
          * Gets or sets the playback rate. 
          */
        public playbackRate = (value?: number): number => {
            if (typeof value !== "undefined" && value !== void 0) this._audio.playbackRate = value;
            return this._audio.playbackRate;
        }

        /**
          * Gets or sets a value indicating whether it is muted. 
          */
        public muted = (value?: boolean): boolean => {
            if (typeof value !== "undefined" && value !== void 0) this._audio.muted = value;
            return this._audio.muted;
        }

        /**
          * Gets or sets the default playback rate. 
          */
        public defaultPlaybackRate = (value?: number): number => {
            if (typeof value !== "undefined" && value !== void 0) this._audio.defaultPlaybackRate = value;
            return this._audio.defaultPlaybackRate;
        }

        /**
          * Gets whether it can play specific file type. 
          */
        public canPlayType = (mime?: string): string => {
            return this._audio.canPlayType(mime);
        }

        /**
          * Gets or sets current time to play. 
          */
        public currentTime = (value?: number): number => {
            if (typeof value !== "undefined" && value !== void 0) this._audio.currentTime = value;
            return this._audio.currentTime
        }

        /**
          * Copies the specific binding control view model and additional information. 
          */
        public copyBinding(control: Common.BindingControl<any>) {
            control.info(this.client());
            control.bindViewModel(this.model);
        }

        private _initClient() {
            if (!!this._client) return;
            var client: AudioClientContract = {
                sourceNode: () => {
                    return !!this._audioCtx ? this._audioCtx.createMediaElementSource(this._audio) : null;
                },
                initialTime: (): number => {
                    return (<any>this._audio).initialTime;
                },
                readyState: (): any => {
                    return this._audio.readyState;
                },
                autobuffer: (): boolean => {
                    return (<any>this._audio).autobuffer;
                },
                loop: (value?: boolean): boolean => {
                    if (typeof value !== "undefined" && value !== void 0) this._audio.loop = value;
                    return this._audio.loop;
                },
                ended: (): boolean => {
                    return this._audio.ended;
                },
                buffered: (): TimeRanges => {
                    return this._audio.buffered;
                },
                pause: (): void => {
                    if (this.paused()) return;
                    this.pause();
                },
                paused: (): boolean => {
                    return this.paused();
                },
                play: (): void => {
                    if (!this.paused()) return;
                    this.play();
                },
                played: this.played,
                loaded: this.voiceLoaded,
                error: (): MediaError => {
                    return this._audio.error;
                },
                seekable: (): TimeRanges => {
                    return this._audio.seekable;
                },
                autoplay: (value?: boolean): boolean => {
                    if (typeof value !== "undefined" && value !== void 0) this.autoplay(value);
                    return this.autoplay();
                },
                preload: (value?: string): string => {
                    if (typeof value !== "undefined" && value !== void 0) this._audio.preload = value;
                    return this._audio.preload;
                },
                volume: (value?: number): number => {
                    if (typeof value !== "undefined" && value !== void 0) this.volume(value);
                    return this.volume();
                },
                playbackRate: (value?: number): number => {
                    if (typeof value !== "undefined" && value !== void 0) this.playbackRate(value);
                    return this.playbackRate();
                },
                duration: (): number => {
                    return this._audio.duration;
                },
                muted: (value?: boolean): boolean => {
                    if (typeof value !== "undefined" && value !== void 0) this.muted(value);
                    return this.muted();
                },
                defaultPlaybackRate: (value?: number): number => {
                    if (typeof value !== "undefined" && value !== void 0) this.defaultPlaybackRate(value);
                    return this.defaultPlaybackRate();
                },
                canPlayType: (mime: string): string => {
                    return this.canPlayType(mime);
                },
                seeking: (): boolean => {
                    return this._audio.seeking;
                },
                currentTime: (value?: number): number => {
                    if (typeof value !== "undefined" && value !== void 0) this.currentTime(value);
                    return this.currentTime();
                },
                keypoints: this.keypoints,
                sound: (path: string, mime: string) => {
                    this.sound(path, mime);
                    client.changed.raise(this.soundSet());
                    return this.soundSet();
                },
                soundSet: (value?: Collection.KeyValuePairContract<string, string>[]) => {
                    if (typeof value !== "undefined" && value !== void 0) {
                        this.soundSet(value);
                        client.changed.raise(this.soundSet());
                    }

                    return this.soundSet();
                },
                clear: () => {
                    this.soundSet(null);
                },
                contain: (path: string): boolean => {
                    return this.contain(path);
                },
                changed: new Collection.EventHandlers<Collection.KeyValuePairContract<string, string>[]>(),
                name: this.name,
                album: this.album,
                artist: this.artist,
                model: this.model
            };
            if (!this._client) this._client = client;
        }

        private _bindingControl(): Common.BindingControl<AudioClientContract> {
            if (!!this._bindings) return this._bindings;
            var vEle = this.getChildElement(true, "v");
            if (!vEle) return this._bindings;
            this._bindings = new Common.BindingControl(vEle.id);
            this.propChanged.add((ev: Collection.ValueChangedContract<any>) => {
                if (!!ev) this._bindings.prop(ev.key, ev.value);
            });
            return this._bindings;
        }

        private _renew() {
            this._audio = typeof Audio === "undefined" ? document.createElement("audio") : new Audio();
            this._audio.id = this.getId() + "_a";
            Elements.listen(this._audio, "play",(ev: Event) => {
                this.played.raise(true);
            });
            Elements.listen(this._audio, "pause", (ev: Event) => {
                this.played.raise(false);
            });
            Elements.listen(this._audio, "load", (ev: Event) => {
                this.voiceLoaded.raise(this.soundSet());
            });
            this.appendElement(this._audio);
        }

    }

    /**
      * Audio view extender.
      * This is used to extend view abilities with DOM accessing for audio player.
      */
    export class AudioExtender<T> implements Common.BindingControlExtender<T> {

        /**
          * Extender name.
          */
        public name = "ali-hub-player-audio";

        /**
          * Inteval to refresh.
          */
        public interval = 300;

        /**
          * A value indicating whether refresh automatics after loading.
          */
        public autoRefresh = true;

        /**
          * Gets model.
          * @param control  The list control which requests to process this method.
          * @param item  The target list item info.
          */
        public model(control: AliHub.Common.BindingControl<T>): any {
            return { refresh: (loop = true) => this.refresh(control, loop) };
        }
    
        /**
          * Gets the player.
          * @param control  The control which requests to process this method.
          */
        public player(control: AliHub.Common.BindingControl<T>): AliHub.Media.AudioClientContract {
            return <any>control.info();
        }

        /**
          * Loads after done.
          * @param control  The control which requests to process this method.
          */
        public load(control: AliHub.Common.BindingControl<T>): void {
            var player = this.player(control);
            if (!player) return;
            var playEle = control.getChildElement(true, "c", "cnt", "actions", "play");
            var pauseEle = control.getChildElement(true, "c", "cnt", "actions", "pause");
            if (!!pauseEle) pauseEle.style.display = "none";
            var regInfo: any = {};
            if (this.autoRefresh) this.refresh(control);
            regInfo.played = player.played.add((ev) => {
                if (!control.getElement() && !!regInfo.played) (<AliHub.Common.DisposableContract>regInfo.played).dispose();
                if (ev) {
                    this.refresh(control);
                } else {
                    if (!!playEle) playEle.style.display = "";
                    if (!!pauseEle) pauseEle.style.display = "none";
                }
            });
            var barEle = control.getChildElement(true, "c", "cnt", "progress", "bar");
            if (!!barEle) AliHub.Elements.listen(barEle, "click", (ev: MouseEvent) => {
                if (!barEle.offsetWidth) return;
                var coordinate = AliHub.Elements.getMousePosition(barEle);
                if (!coordinate || coordinate.x == null) return;
                this.turnToPercents(control, coordinate.x, barEle.offsetWidth);
                AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
            });
            var dragEle = control.getChildElement(true, "c", "cnt", "progress", "bar", "drag");
            if (!!dragEle) AliHub.Elements.addGesture(barEle, {
                moving: (element, distance) => {
                    var position = AliHub.Elements.getMousePosition(barEle);
                    if (position.x < 0) position.x = 0;
                    else if (position.x > barEle.offsetWidth) position.x = barEle.offsetWidth;
                    if (!position.x || isNaN(position.x)) return;
                    dragEle.style.left = position.x.toString() + "px";
                    AliHub.Elements.changeStyleRef(barEle, "ali-state-active-t");
                },
                moveEnd: (element, distance) => {
                    var duration = player.duration();
                    if (!duration || isNaN(duration)) {
                        AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                        return;
                    }

                    var position = AliHub.Elements.getMousePosition(barEle);
                    var currentTime = position.x * 1.0 / barEle.offsetWidth * duration;
                    if (!position.x || isNaN(position.x)) {
                        AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                        return;
                    }

                    if (currentTime < 0) position.x = 0;
                    else if (currentTime > duration) currentTime = duration;
                    player.play();
                    player.currentTime(currentTime);
                    AliHub.Elements.changeStyleRef(barEle, null, "ali-state-active-t");
                }
            });
        }

        /**
          * Turns to the specific percents of play progress.
          * @param control  The control which requests to process this method.
          * @param value  The value to go.
          * @param denominator  The denominator.
          */
        public turnToPercents(control: AliHub.Common.BindingControl<T>, value: number, denominator: number = 100) {
            if (value < 0 || denominator < 0 || value > denominator) return;
            var player = this.player(control);
            if (!player || !player.duration()) return;
            var sec = player.duration() * value / denominator;
            player.currentTime(sec);
        }

        /**
          * Refreshes the control.
          * @param control  The control which requests to process this method.
          * @param loop  A value indicating whether need try to loop to refresh if it is playing.
          */
        public refresh(control: AliHub.Common.BindingControl<T>, loop = true) {
            var player = this.player(control);
            if (!player || !control.parentElement()) return;
            var playEle = control.getChildElement(true, "c", "cnt", "actions", "play");
            var pauseEle = control.getChildElement(true, "c", "cnt", "actions", "pause");
            if (player.paused()) {
                playEle.style.display = "";
                pauseEle.style.display = "none";
                return;
            }

            playEle.style.display = "none";
            pauseEle.style.display = "";
            var bgContainerEle = control.getChildElement(true, "c", "cnt", "progress", "bar");
            var bgBarEle = control.getChildElement(true, "c", "cnt", "progress", "bar", "bg");
            var currentTime = player.currentTime() != null && !isNaN(player.currentTime()) && player.currentTime() > 0 ? player.currentTime() : null;
            var duration = player.duration() != null && !isNaN(player.duration()) && player.duration() > 0 ? player.duration() : null;
            if (!!duration && !!currentTime) {
                var percentNumber = player.currentTime() * 100 / player.duration();
                if (percentNumber > 100) percentNumber = 100;
                else if (percentNumber < 0) percentNumber = 0;
                var percent = percentNumber.toString();
                var percentDot = percent.indexOf(".");
                if (percentDot === 0) {
                    percent = "0" + percent;
                } else if (percentDot < percent.length - 4) {
                    percent = percent.substring(0, percentDot + 4);
                }

                bgBarEle.style.width = percent + "%";
            }

            control.getChildElement(true, "c", "cnt", "time", "current").innerHTML = !!currentTime ? AliHub.Common.DateTime.toSpanString(currentTime * 1000, false) : "";
            control.getChildElement(true, "c", "cnt", "time", "rest").innerHTML = !!duration && !!currentTime ? AliHub.Common.DateTime.toSpanString((duration - currentTime) * 1000, false) : "";
            control.getChildElement(true, "c", "cnt", "time", "duration").innerHTML = !!duration ? AliHub.Common.DateTime.toSpanString(duration * 1000, false) : "";

            var kpEle = control.getChildElement(true, "c", "cnt", "progress", "bar", "kp");
            if (!!player.keypoints && !!duration) {
                var size = Elements.getSize(bgContainerEle);
                var keypoints = player.keypoints();
                if (!!keypoints && keypoints.length > 0 && !!size && !!size.x && !!kpEle) {
                    kpEle.style.display = "";
                    var kpStr = "";
                    keypoints.forEach((ele, i, arr) => {
                        if (!ele || !ele.time || ele.time < 0 || ele.time > duration) return;
                        kpStr += "<span style=\"left: " + (ele.time / duration * size.x).toFixed(0) + "px; \" class=\"ali-container-main\"" + (!!ele.note ? (" title=\"" + ele.note.toString() + "\"") : "") + ">" + i.toString() + "</span>";
                    });
                    kpEle.innerHTML = kpStr;
                }
            } else {
                if (!!kpEle) kpEle.innerHTML = "";
                kpEle.style.display = "none";
            }

            if (loop) setTimeout(() => {
                this.refresh(control);
            }, this.interval);
        }

    }

    /**
      * Camera control.
      */
    export class CameraControl extends Common.VisualControl {

        private _mediaStream = null;
        private _webcamList;
        private _currentCam = null;
        private _photoTempV: string;
        private _photoTempT: string;
        private _invalidTempV: string;
        private _invalidTempT: string;
        private _count = 0;

        /**
          * A value indicating whether can switch camera.
          */
        public canSwitch = Common.bindingObj(true);

        /**
          * Width of camera view.
          */
        public viewWidth = 640;

        /**
          * Height of camera view.
          */
        public viewHeight = 360;

        /**
          * Occurs after captured.
          */
        public captured = new Collection.EventHandlers<CameraCapturedInfoContract>();

        /**
          * File name prefix.
          */
        public filePrefix = "WEBCAM";

        /**
          * The data model convertor.
          */
        public photoModelConvert: Common.Func1<CameraCapturedInfoContract, any>;

        /**
          * The data model for not support.
          */
        public notSupportModel = Common.bindingObj();

        /**
          * A value indicating whether the photos captured is desc.
          */
        public isDesc = Common.bindingObj(false);

        /**
          * Initializes a new instance of the CameraControl class.
          * @param id  Element ID. The content will be filled into this element to replace original ones.
          */
        public constructor(id: Common.VisualControlElementContract) {
            super(id);

            this.addStyleRef("ali-controls-camera");
            this.innerHTML('<div id="__view_control_actions"><button id="__view_control_actions_switch" type="button" disabled="disabled">' + Res.builtIn().localString("switchCamera") + '</button></div><video id="__view_control_video" class="ali-container-main"></video><div id="__view_control_invalid" style="display: none;"></div><ul id="__view_control_captured" class="ali-container-main"></ul>');
            this.listen("click", () => { this.capture(); }, "video");
            this.listen("click", () => { this.nextWebCam(); }, "actions", "switch");
            this.canSwitch.subscribe((newValue) => {
                if (newValue != null) this.getChildElement<HTMLButtonElement>(true, "actions", "switch").disabled = newValue;
            });
        }

        /**
          * Loads specific options.
          * @param options  The options to load. 
          */
        public loadOptions(value: CameraControlOptionsContract | boolean): any {
            var options: CameraControlOptionsContract = super.loadOptions(value);
            if (!options) return options;
            if (!!options.captured) this.captured.add((arg) => { options.captured(arg); });
            if (options.isDesc != null) this.isDesc(options.isDesc);
            if (options.filePrefix != null) this.filePrefix = options.filePrefix.toString();
            if (options.viewWidth != null) this.viewWidth = options.viewWidth;
            if (options.viewHeight != null) this.viewHeight = options.viewHeight;
            if (!!options.photoModelConvert) this.photoModelConvert = options.photoModelConvert;
            if (!options.ignoreParts) {
                this.setPhotoTemplate("initpart", null);
                this.setNotSupportTemplate("initpart", null);
            }

            this.setPhotoTemplate(options.photoTemplateType, options.photoTemplate);
            this.setNotSupportTemplate(options.notSupportTemplateType, options.notSupportTemplate);
            if (!this.available()) {
                if (!!options.failedLoad) options.failedLoad();
            } else {
                if (!options.lazyLoad) this.start();
            }

            return options;
        }

        /**
          * Rotates through the webcam device list.
          */
        public nextWebCam() {
            // 1. Release the current webcam (if there is one in use)
            // 2. Call getUserMedia() to access the next webcam

            this.canSwitch(false);
            var video = this.getChildElement<HTMLVideoElement>(true, "video");
            if (this._currentCam !== null) {
                this._currentCam++;
                if (this._currentCam >= this._webcamList.length) {
                    this._currentCam = 0;
                }
                if (typeof ((video as any).srcObject) !== 'undefined') (video as any).srcObject = null;
                video.src = null;
                if (this._mediaStream) {
                    var videoTracks = this._mediaStream.getVideoTracks();
                    videoTracks[0].stop();
                    this._mediaStream = null;
                }
            } else {
                this._currentCam = 0;
            }

            (navigator as any).mediaDevices.getUserMedia({
                video: {
                    width: this.viewWidth,
                    height: this.viewHeight,
                    deviceId: { exact: this._webcamList[this._currentCam] }
                }
            }).then((stream) => {
                // Set the mediaStream on the video tag.
                this._mediaStream = stream;
                (video as any).srcObject = this._mediaStream;
                if (video.paused) video.play();
                Elements.changeStyleRef(video, "ali-info-filled-t");
                if (this._webcamList.length > 1) {
                    this.canSwitch(true);
                }
            }).catch((e) => { this._getUserMediaError(e); });
        }

        /**
          * Occurs when click on video tag.
          */
        public capture() {
            // 1. Capture a video frame from the video tag and render on the canvas element

            if (!this._mediaStream) {
                return;
            }

            try {
                this._count++;
            } catch (ex) { this._count = 0; }
            var video = this.getChildElement<HTMLVideoElement>(true, "video");
            var canvas = document.createElement("canvas");
            var picList = this.getChildElement<HTMLUListElement>("captured");
            var picItem = document.createElement("li");
            picItem.id = this.getId() + "_captured_i" + this._count.toString();
            var button = document.createElement("button");
            button.type = "button";
            button.value = Res.builtIn().localString("download");
            button.innerHTML = Res.builtIn().localString("download");
            if (!this.isDesc() || !picList.firstElementChild) {
                picList.appendChild(picItem);
            } else {
                picList.insertBefore(picItem, picList.firstElementChild);
            }

            picItem.appendChild(canvas);
            picItem.appendChild(button);

            var link = document.createElement("a");
            link.innerHTML = Res.builtIn().localString("download");
            link.style.display = "none";
            var time = new Date();
            var name = (this.filePrefix || "") + Common.DateTime.toCustomizedString(time, "{{yyyy}}{{MM}}{{dd}}{{HH}}{{mm}}{{ss}}{{mmm}}");
            picItem.appendChild(link);

            var videoWidth = video.videoWidth;
            var videoHeight = video.videoHeight;

            if (canvas.width !== videoWidth || canvas.height !== videoHeight) {
                canvas.width = videoWidth;
                canvas.height = videoHeight;
            }

            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
            var download = () => {
                if (navigator.msSaveBlob) {
                    var imgData1 = (canvas as any).msToBlob("image/jpeg");
                    navigator.msSaveBlob(imgData1, name + ".jpg");
                } else {
                    link.href = canvas.toDataURL("image/jpeg");
                    (link as any).download = name + ".jpg";
                    link.click();
                }
            };
            Elements.listen(button, "click", download);

            var info = (): CameraCapturedInfoContract => {
                return {
                    image: (styleRef?: string) => {
                        return {
                            type: "url",
                            url: canvas.toDataURL("image/jpeg"),
                            styleRef: styleRef
                        }
                    },
                    captured: time,
                    download: download,
                    size: { x: videoWidth, y: videoHeight }
                };
            };

            if (!!this._photoTempT || !!this._photoTempV) {
                var bindingEle = document.createElement("div");
                bindingEle.id = picItem.id + "_b";
                picItem.appendChild(bindingEle);
                var bindingControl = new Common.BindingControl<CameraCapturedInfoContract>(bindingEle);
                bindingControl.setTemplate(this._photoTempT, this._photoTempV);
                bindingControl.viewModel(info());
                bindingControl.convertor((entry) => {
                    return !!this.photoModelConvert ? this.photoModelConvert(entry) : null;
                });
            }

            this.captured.raise(info());
        }

        /**
          * Starts to get webcams and opens the first one.
          */
        public start() {
            if (!this.available()) return;

            // Starts enumerateDevices() and define the callback functions.
            (navigator as any).mediaDevices.enumerateDevices().then((devices) => {
                // 1. Identify all webcam devices and store the info in the webcamList
                // 2. Start the demo with the first webcam on the list
                // 3. Show the webcam 'switch' button when there are multiple webcams
                // 4. Show error message when there is no webcam
                // 5. Register event listener (devicechange) to respond to device plugin or unplug

                // Identify all webcams
                this._webcamList = [];
                for (var i = 0; i < devices.length; i++) {
                    if (devices[i].kind === 'videoinput') {
                        this._webcamList[this._webcamList.length] = devices[i].deviceId;
                    }
                }

                if (this._webcamList.length > 0) {
                    // Start video with the first device on the list
                    this.nextWebCam();
                    this.canSwitch(this._webcamList.length > 1);
                }
                else {
                    Diagnostics.error("CoreLibrary", "[0x02710501] Webcam not found.");
                }
                Elements.listen((navigator as any).mediaDevices, "devicechange", () => { this.deviceChanged(); });
            }).catch((e) => { this._getUserMediaError(e); });
        }

        /**
          * Check if it can work.
          */
        public available() {
            return (navigator as any).getUserMedia;
        }

        /**
          * Handles devicechange event.
          */
        public deviceChanged() {
            // 1. Reset webcamList
            // 2. Re-enumerate webcam devices

            Elements.unlisten((navigator as any).mediaDevices, "devicechange", () => { this.deviceChanged(); });

            // Reset the webcam list and re-enumerate
            this._webcamList = [];
            this.start();
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public setPhotoTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "");
                if (!value) value = this.templatePart(!!value ? value : "photo");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._photoTempT = valueType;
            this._photoTempV = value;
        }

        /**
          * Sets the template. 
          * @param valueType  The data source type for the value.
          * @param value  The data source value.
          */
        public setNotSupportTemplate(valueType: string, value: string) {
            if (valueType == null && value == null) return;
            if (valueType === "part" || valueType === "initpart") {
                value = this.templatePart(!!value ? value : "");
                if (!value) value = this.templatePart(!!value ? value : "notsupport");
                if (valueType === "initpart" && !value) return;
                valueType = "";
            }

            this._invalidTempT = valueType;
            this._invalidTempV = value;
        }

        /**
          * Callback function when getUserMedia() returns error.
          */
        private _getUserMediaError(e) {
            if (e.name.indexOf("NotFoundError") >= 0) {
                Diagnostics.error("CoreLibrary", "[0x02712301] Webcam not found.");
            }
            else {
                Diagnostics.error("CoreLibrary", "[0x02712302] The following error occurred: " + e.name + ". Please check your webcam device(s) and try again.");
            }
        }

    }

    export function speak(sentence) {
        if (!sentence) return null;
        try {
            var utterance = new (window as any).SpeechSynthesisUtterance(sentence);
            (window as any).speechSynthesis.speak(utterance);
            return sentence;
        } catch (ex) { }
        return null;
    }

    /**
      * Creates an AudioContext object.
      */
    export function audioContext() {
        return (!!(window as any).AudioContext || !!(window as any).webkitAudioContext) ? new ((window as any).AudioContext || (window as any).webkitAudioContext)() : null;
    }

    /**
      * Creates an AudioControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function audioControl(idSuffix: string, options?: AudioControlOptionsContract, parent?: Common.VisualControl): AudioControl {
        return Common.createControl(idSuffix, AudioControl, options, parent) as AudioControl;
    }

    /**
      * Creates an CameraControl.
      * @param idSuffix  The identifier or identifier suffix if has a parent control.
      * @param parent  The parent control.
      * @param options  The initializition options.
      */
    export function cameraControl(idSuffix: string, options?: CameraControlOptionsContract, parent?: Common.VisualControl): CameraControl {
        return Common.createControl(idSuffix, CameraControl, options, parent) as CameraControl;
    }

}
 