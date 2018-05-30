<template>
    <section class="titleBar">
      <div style="margin: 2px; height: 50px;">
        <slot name="backBtn"><span></span></slot>
      </div>
      <section class="secondRow">
        <div>
          <slot name="title"><span></span></slot>
        </div>
        <slot name="nextBtn"><span></span></slot>
      </section>
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
@import "../../style/define.scss";

.titleBar {
  width: 100%;
  font-size: 12px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  background-color: $blockBackgroundColor;
  z-index: 9999;
  padding: 10px;
}

.secondRow{
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

</style>
