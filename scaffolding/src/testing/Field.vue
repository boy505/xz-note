<template>
  <div>
    <!-- testing/Field.vue -->
    <mt-field
      type="text"
      label="用户名"
      placeholder="请输入用户名"
      disableClear
      state="success"></mt-field>
    <mt-field
      type="password"
      label="密码"
      placeholder="请输入密码"
      state="error"></mt-field>
    <mt-field
      type="text"
      label="手机号"
      placeholder="请输入手机号"
      state="warning"
      :attr="{maxlength:11, autocomplete:'off'}"></mt-field>
  </div>
</template>