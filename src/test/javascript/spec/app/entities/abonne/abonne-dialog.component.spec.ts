/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ShanaTestModule } from '../../../test.module';
import { AbonneDialogComponent } from '../../../../../../main/webapp/app/entities/abonne/abonne-dialog.component';
import { AbonneService } from '../../../../../../main/webapp/app/entities/abonne/abonne.service';
import { Abonne } from '../../../../../../main/webapp/app/entities/abonne/abonne.model';

describe('Component Tests', () => {

    describe('Abonne Management Dialog Component', () => {
        let comp: AbonneDialogComponent;
        let fixture: ComponentFixture<AbonneDialogComponent>;
        let service: AbonneService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShanaTestModule],
                declarations: [AbonneDialogComponent],
                providers: [
                    AbonneService
                ]
            })
            .overrideTemplate(AbonneDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbonneDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbonneService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Abonne(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.abonne = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'abonneListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Abonne();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.abonne = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'abonneListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
