import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-table/cell/events/view/tickets/cell-add-order-price', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{ui-table/cell/events/view/tickets/cell-add-order-price paymentCurrency='USD'}}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});