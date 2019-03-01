Vue.component('button-x', {
    props: ['x'],
    template: `<div class="col-4">
                    <button class="btn btn-primary" v-on:click="$emit('insert-number', x)">{{ x }}</button>
               </div>`
});

const ADD = '+';
const SUB = '-';

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        previousValues: [],
        prevOperation: ADD,
        sum: '',
        invalid: false
    },
    methods: {
        validate: function (event) {
            const regExp = new RegExp("^([0-7]|\-)+$");
            this.invalid = !this.message.match(regExp) || isNaN(parseInt(this.message));
        },
        decode: function (number) {
            parseInt(number).toString(8);
        },
        encode: function (number) {
            parseInt(number).toString(10);
        },
        addNumber: function (number) {
            this.message += number.toString();
        },
        clear: function () {
            this.message = '';
            this.previousValues = [];
            this.sum = '';
            this.prevOperation = ADD;
        },
        add: function () {
            if (this.message) {
                this.previousValues.push(
                    {
                        o: this.prevOperation,
                        value: this.message,
                    });
                this.prevOperation = ADD;
                this.message = '';
            }
        },
        sub: function () {
            if (this.message) {
                this.previousValues.push(
                    {
                        o: this.prevOperation,
                        value: this.message,
                    });
                this.message = '';
            }
            this.prevOperation = SUB;
        },
        calculate: function () {
            this.add();
            let temp = this.previousValues
                .reduce((sum, cur) => {
                    if (cur.o === ADD || cur.o == undefined)
                        return sum + parseInt(cur.value, 8);
                    else
                        return sum - parseInt(cur.value, 8);

                }, 0);
            this.sum = temp.toString(8);
        }
    }
});
