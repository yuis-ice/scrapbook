
<template>
    <div>
        <div id="content" name="content" class="main container">
            <div class="row">
                <div class="col-12">
                    <div class="divider py-1 bg-dark mt-3 mb-3"></div>
                </div>
            </div>
            <h2>## scrapbook</h2>
            <div class="row">
                <div class="col-12">
                    <div class="divider py-1 bg-dark mt-3 mb-3"></div>
                </div>
            </div>

            <div class="row">
                <div class="col-3"> 
                    <div class="form-group">
                        <label>memo</label>
                        <textarea class="form-control rounded-0" v-model="memo" v-on:input="update_images"></textarea> 
                    </div> 
                </div>
                <div class="col-3">
                    <label>col size: {{colsize}}</label>
                    <input type="range" value="6" min="1" max="12" class="w-100 p-3" v-model="colsize">
                </div>
                <div class="col-6">
                    <label>date range: {{dateRange.startDate | date}} to {{dateRange.endDate | date}}</label>
                    <div> 
                        <date-range-picker
                            ref="picker"
                            opens="center"
                            :locale-data="locale"
                            :maxDate="maxDate"
                            v-model="dateRange"
                            @update="update_images"
                        >
                            <!-- <template v-slot:input="picker" style="min-width: 350px;"> -->
                            <template v-slot:input="picker">
                                {{ picker.startDate | date }} - {{ picker.endDate | date }}
                            </template>
                        </date-range-picker>                    
                    </div>
                </div>
                <div class="col-3">
                    <label>rate min: {{rate_min}}</label>
                    <input type="range" value="6" min="1" max="10" class="w-100 p-3" v-model="rate_min" v-on:input="update_images">
                </div>
                <div class="col-3">
                    <label>rate max: {{rate_max}}</label>
                    <input type="range" value="6" min="1" max="10" class="w-100 p-3" v-model="rate_max" v-on:input="update_images">
                </div>
                <div class="col-6">
                </div>
                <viewer :images="images">
                    <img :class="'col-' + colsize" v-for="src in images" :key="src" :src="src">
                </viewer>
            </div>
        </div>
    </div>
</template>

<style media="screen">

    .image {
        height: 200px;
        cursor: pointer;
        margin: 5px;
        display: inline-block;
    }

</style>

<script>
  
    import 'bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    
    import DateRangePicker from 'vue2-daterange-picker'
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

    const moment = require('moment');
    const axios = require('axios');
    const yaml = require('js-yaml');

    export default {
        components: { 
            DateRangePicker 
        },
        data() {
            return {
                images: [],
                config: null,
                colsize: 3,
                rate_min: 1,
                rate_max: 10,
                memo: "",

                maxDate: moment().format('YYYY-MM-DD'),
                dateRange: {
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD'),
                },
                locale: {
                    direction: 'ltr', 
                    format: 'mm/dd/yyyy',
                    separator: ' - ', 
                    applyLabel: 'Apply',
                    cancelLabel: 'Cancel',
                    weekLabel: 'W',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: moment.weekdaysMin(), 
                    monthNames: moment.monthsShort(), 
                    firstDay: 1 
                },

            };
        },
        mounted() {
            axios
                .get('../scrapbook.config.yml')
                .then(response => {
                    let config = yaml.load(response.data)
                    this.config = config 
                    this.images = config.database.map(a => "../" + a.path)
                });
            
            // dev 
            window.moment = moment;
            window.axios = axios;
            window.yaml = yaml;
        },        
        methods: {
            update_images(event) {

                // let images = [];
                let images = this.config.database;
                images = images.filter(a => a.rate >= this.rate_min && a.rate <= this.rate_max)
                if (this.memo.length > 0) 
                    images = images.filter(a => a.memo && a.memo.match(this.memo));
                if (this.dateRange.startDate !== moment().format('YYYY-MM-DD') && this.dateRange.endDate !== moment().format('YYYY-MM-DD'))
                {
                    let startDate = moment(this.dateRange.startDate).unix();
                    let endDate = moment(this.dateRange.endDate).unix();
                    images = images.filter(a => moment(a.date, this.config.meta.date_format).unix() >= startDate && moment(a.date, this.config.meta.date_format).unix() <= endDate)
                    console.log(startDate, endDate, images);
                }

                this.images = images.map(a => "../" + a.path)                
            },
        },
        filters: {
            date(val) {
                return val ? moment(val).format("YYYY-MM-DD") : "";
            }
        },        
    }

</script>
