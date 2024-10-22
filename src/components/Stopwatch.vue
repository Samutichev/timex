<template>
	<div class="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
		<div class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md max-w-md w-full">
			<div id="timer" class="text-6xl mb-6 text-center dark:text-white">{{ formattedTime }}</div>

			<div class="grid grid-cols-3 gap-4 mb-6">
				<button @click="toggleTimer" :disabled="isRunning" class="btn btn-primary">{{ $t('start') }}</button>
				<button @click="toggleTimer" :disabled="!isRunning" class="btn btn-secondary">{{ $t('pause') }}</button>
				<button @click="resetTimer" class="btn btn-danger">{{ $t('reset') }}</button>
			</div>

			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<label for="language" class="mr-2 dark:text-white">{{ $t('language') }}:</label>
					<select id="language" v-model="currentLanguage" @change="changeLanguage" class="form-select">
						<option value="ru">Русский</option>
						<option value="en">English</option>
					</select>
				</div>

				<div class="flex items-center justify-between">
					<label for="theme" class="mr-2 dark:text-white">{{ $t('theme') }}:</label>
					<select id="theme" v-model="currentTheme" @change="changeTheme" class="form-select">
						<option value="light">{{ $t('light') }}</option>
						<option value="dark">{{ $t('dark') }}</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const seconds = ref(0)
const isRunning = ref(false)
const timerInterval = ref(null)
const currentLanguage = ref('ru')
const currentTheme = ref('light')

const formattedTime = computed(() => {
	const minutes = Math.floor(seconds.value / 60).toString().padStart(2, '0')
	const remainingSeconds = (seconds.value % 60).toString().padStart(2, '0')
	return `${minutes}:${remainingSeconds}`
})

const toggleTimer = () => {
	if (!isRunning.value) {
		timerInterval.value = setInterval(() => {
			seconds.value++
		}, 1000)
	} else {
		clearInterval(timerInterval.value)
	}
	isRunning.value = !isRunning.value
}

const resetTimer = () => {
	clearInterval(timerInterval.value)
	seconds.value = 0
	isRunning.value = false
}

const changeLanguage = () => {
	locale.value = currentLanguage.value
}

const changeTheme = () => {
	document.documentElement.classList.toggle('dark', currentTheme.value === 'dark')
}

watch(currentLanguage, changeLanguage)
watch(currentTheme, changeTheme)

onMounted(() => {
	changeLanguage()
	changeTheme()
})
</script>
