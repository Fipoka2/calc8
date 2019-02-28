
Vue.component('button-x', {
    props:['x'],
    template: `<div class="col-4">
                    <button class="btn btn-primary" v-on:click="$emit('insert-number', x)">{{ x }}</button>
               </div>`
});

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        previousValues: [],
        sum: ''

    },
    methods: {
        decode: function(number) { parseInt(number).toString(8);},
        encode: function(number) { parseInt(number).toString(10);},
        addNumber: function(number) { this.message += number.toString();},
        clear: function() {
            this.message = '';
            this.previousValues = [];
            this.sum = '';
            },
        add: function() {
           if (this.message) {
               this.previousValues.push(this.message);
               this.message = '';
           }
        },
        calculate: function() {
             this.add();
             let temp = this.previousValues
                 .reduce( (sum, cur) => sum + parseInt(cur), 0);
             this.sum = temp.toString(8);
        }
    }
});
