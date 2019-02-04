var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform, ModalController, NavParams } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { PhotoDTO } from './photo-dto';
var PhotoModalPage = /** @class */ (function () {
    function PhotoModalPage(platform, camera, modalController, navParams) {
        this.platform = platform;
        this.camera = camera;
        this.modalController = modalController;
        this.navParams = navParams;
        this.mobile = false;
    }
    PhotoModalPage.prototype.ngOnInit = function () {
        this.photodto = this.navParams.get('photodto');
        if (!this.photodto) {
            this.photodto = new PhotoDTO();
        }
    };
    PhotoModalPage.prototype.loadPhoto = function () {
        if (!this.mobile) {
            document.getElementById('file').click();
        }
        else {
            this.takePicture();
        }
    };
    PhotoModalPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.photodto.photo = base64Image;
            _this.camera.cleanup();
        }, function (err) {
            console.log(err);
        });
    };
    PhotoModalPage.prototype.atualizaArquivo = function (event) {
        var _this = this;
        if (!this.mobile) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(event.srcElement.files[0]);
            reader_1.onload = function () {
                _this.photodto.photo = reader_1.result.toString();
            };
            reader_1.onerror = function (error) { return console.log(error); };
        }
    };
    PhotoModalPage.prototype.salvar = function () {
        this.modalController.dismiss(this.photodto);
    };
    PhotoModalPage.prototype.fechar = function () {
        this.modalController.dismiss();
    };
    PhotoModalPage = __decorate([
        Component({
            selector: 'app-photo-modal',
            templateUrl: './photo-modal.page.html',
            styleUrls: ['./photo-modal.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            Camera,
            ModalController,
            NavParams])
    ], PhotoModalPage);
    return PhotoModalPage;
}());
export { PhotoModalPage };
//# sourceMappingURL=photo-modal.page.js.map