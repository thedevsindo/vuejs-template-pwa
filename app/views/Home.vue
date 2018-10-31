<template>
    <div>
        <div class="container-fluid">
            <div class="m-auto" style="width: 200px;" v-html="require('assets/images/logo/vuelogo.svg')"></div>
            <div class="text-center" style="margin-bottom: 50px">
                <h1>Welcome</h1>
            </div>
            <div class="row" style="background-color: #fafafa">
                <div class="col-lg-12" style="padding: 60px;">
                    <h4>Powered By</h4>
                    <div class="row">
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/nodejs.png')"/>
                        </div>
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/webpack.png')"/>
                        </div>
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/expressjs.png')"/>
                        </div>
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/sass.png')"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/eslint.png')"/>
                        </div>
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/yarn.png')"/>
                        </div>
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/babel.png')"/>
                        </div>
                        <div class="col-lg-3">
                            <img class="img-fluid" :src="require('assets/images/bootstrap.png')"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
