<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="modelValue" class="modal modal-right">
                <div class="close-icon cursor-pointer" @click="$emit('update:modelValue', false)">x</div>
                <div class="modal-content">
                  <slot/>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px; /* или нужная ширина */
  background: #fff;
  z-index: 9999;
  box-shadow: -2px 0 8px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}

.modal-right {
  /* дополнительный класс, если нужно */
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.close-icon {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 24px;
}

.modal-enter-active, .modal-leave-active {
  transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.modal-enter-to, .modal-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>