<template>
    <div class="alert-container">
        <div class="info-container">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z" fill="white"/>
            </svg>
            <h3 />
        </div>
    </div>
</template>

<style scoped>
.alert-container {
    position: fixed;
    bottom: 20px;
    width: 100%;
    left:0;
    right:0;
    display: flex;
    justify-content: center;
}

.info-container {
    width: 785px;
    background-color: var(--color-seconds-background);
    border: 1px solid var(--color-border);
    border-radius: 12px;
}
.info-container h3 {
    width: 699px;
    height: 36px;
    border-radius: 12px;
    background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
    margin: 18px 0 18px 18px
}
.info-container svg {
    position: relative;
    left: 370px;
    top: 8px;
}
</style>