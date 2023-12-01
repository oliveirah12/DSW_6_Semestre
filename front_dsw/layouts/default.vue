<template>

    <body>
        <div></div>
    </body>

    <slot></slot>
    <Footer/>
</template>

<script setup>
    const autenticado = () => {
        if(localStorage.getItem('token')){
            return false
        }else{
            return true
        }
    }



</script>