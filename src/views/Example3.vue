<template>
    <div>
        <div><input type="button" value="点我" v-on:click="m1"></div>
    </div>
</template>

<script>

const options = {

    data: function () {

        return { msg: "你好" };
    },
    method: {

        m1() {

            console.log("m1");
        },
        m2() {
            console.log("m2");
        }
    }
}

export default options;
</script>