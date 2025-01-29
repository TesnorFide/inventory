<template>
    <div class="group-container">
        <div class="blurred-image-container">
            <img src="/img/nice-bg.png" class="blurred-image" />
        </div>
        <div class="info-container">
            <h3 />
            <span class="w-155" />
            <span  class="w-190" />
            <span   class="w-170" />
            <span   class="w-160" />
            <span   class="w-140" />
            <span   class="w-80" />
        </div>
    </div>
</template>

<style scoped>
.group-container {
    background-color: var(--color-seconds-background);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    width: 236px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.blurred-image-container {
    top: 18px;
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    width: 208px;
    height: 240px;
    overflow: hidden;
}
.blurred-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(10px); /* Размытие изображения */
    transition: filter 0.3s ease; /* Плавное убирание размытия */
}

.info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.info-container h3 {
    width: 190px;
    height: 26px;
    border-radius: 8px;
    background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
    margin: 14px 0;
}
.info-container span {
    margin-bottom: 10px;
    min-width: 80px;
    height: 10px;
    border-radius: 4px;
    background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
    
    &.w-140 {
        min-width: 140px;
    }
    &.w-155 {
        min-width: 155px;
    }
    &.w-160 {
        min-width: 160px;
    }
    &.w-170 {
        min-width: 170px;
    }
    &.w-190 {
        min-width: 190px;
    }
}
</style>