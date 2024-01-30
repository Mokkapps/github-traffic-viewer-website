<template>
  <div>
    <TheHeader />

    <UMain>
      <UContainer>
        <UPage>
          <slot />
          <AuthModal />
        </UPage>
      </UContainer>
    </UMain>

    <TheFooter />
  </div>
</template>
