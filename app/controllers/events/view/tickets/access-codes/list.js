import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';


export default class extends Controller.extend(EmberTableControllerMixin) {
  @computed()
  get columns() {
    return [
      {
        name      : 'Access Code',
        valuePath : 'code'
      },
      {
        name           : 'Access Code URL',
        valuePath      : 'accessUrl',
        cellComponent  : 'ui-table/cell/events/view/tickets/access-codes/cell-url',
        disableSorting : true
      },
      {
        name            : 'Validity',
        valuePath       : 'validFrom',
        extraValuePaths : ['validTill'],
        cellComponent   : 'ui-table/cell/cell-validity'
      },
      {
        name            : 'Status',
        valuePath       : 'isActive',
        extraValuePaths : ['isExpired'],
        cellComponent   : 'ui-table/cell/cell-label'
      },
      {
        name            : 'Actions',
        cellComponent   : 'ui-table/cell/events/view/tickets/access-codes/cell-actions',
        valuePath       : 'id',
        extraValuePaths : ['isActive', 'isExpired'],
        actions         : {
          deleteAccessCode : this.deleteAccessCode.bind(this),
          toggleStatus     : this.toggleStatus.bind(this),
          editAccessCode   : this.editAccessCode.bind(this)
        }
      }
    ];
  }

  @action
  deleteAccessCode(access_id) {
    this.set('isLoading', true);
    let accessCode = this.store.peekRecord('accessCode', access_id, { backgroundReload: false });
    accessCode.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Access Code has been deleted successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
    @action
  toggleStatus(access_id) {
    this.set('isLoading', true);
    let accessCode = this.store.peekRecord('accessCode', access_id, { backgroundReload: false });
    accessCode.toggleProperty('isActive');
    accessCode.save()
      .then(() => {
        this.notify.success(this.l10n.t('Access Code has been updated successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
    @action
    editAccessCode(id) {
      this.transitionToRoute('events.view.tickets.access-codes.edit', id);
    }


}
