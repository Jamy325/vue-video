<template>
    <section class="titleBar">
      <slot name="backBtn"><span></span></slot>

      <slot name="title"><span></span></slot>

      <slot name="nextBtn">
        <span></span>
      </slot>
    </section>
</template>

<script>

export default {
    name: 'titleBar',
    props:["backBtn", "title", "nextBtn"],

    data () {
        return {
        msg: ''
        }
    }
}
</script>hg

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.titleBar {
  position: fixed;
  top:0px;
  width: 100%;
  font-size: 12px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #4D4D4D;
  z-index: 9999;
  border-bottom:1px solid #a09898;

}

</style>
