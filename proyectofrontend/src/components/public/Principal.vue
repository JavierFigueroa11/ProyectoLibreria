<template>
<div>
    <v-tabs>
    <v-tab><router-link to="/home" tag="button">Home</router-link></v-tab>
    <v-tab ><router-link to="/about" tag="button"> About </router-link></v-tab>
    <v-tab><router-link to="/contact" tag="button"> Contact </router-link></v-tab>
    <v-tab><router-link to="/login" tag="button"> Login </router-link></v-tab>
    <v-tab><router-link to="/signin" tag="button"> Sign Up </router-link></v-tab>
    </v-tabs>
  </div>
</template>