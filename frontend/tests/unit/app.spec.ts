import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App.vue';
import store from '@/store';


const localVue = createLocalVue();
localVue.use(Vuex);


describe('App.vue', () => {
  it('show 700 items', (done) => {
    const wrapper = shallowMount(App, {
      localVue,
      store,
      stubs: ['router-link', 'router-view'],
    });

    wrapper.vm.$nextTick(() => {
      const rows = wrapper.element.querySelectorAll('tr');
      expect(rows.length).toBe(700);
      done();
    });
  });
});
