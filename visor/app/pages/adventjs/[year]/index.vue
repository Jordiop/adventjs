<script setup lang="ts">
const route = useRoute()
const year = computed(() => route.params.year as string)

const { data: exercises, error } = await useFetch(`/api/adventjs/${year.value}`)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Year not found'
  })
}

useSeoMeta({
  title: `AdventJS ${year.value}`,
  description: `All AdventJS ${year.value} challenges and solutions`
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="`AdventJS ${year}`"
        :description="`All ${exercises?.days?.length || 0} challenges from ${year}`"
      >
        <template #links>
          <UButton
            to="/adventjs"
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="ghost"
            label="Back to AdventJS"
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <UPageGrid>
          <UPageCard
            v-for="dayInfo in exercises?.days"
            :key="dayInfo.day"
            :title="`Day ${dayInfo.day}`"
            :description="`Challenge ${dayInfo.day}`"
            icon="i-lucide-calendar-days"
            :to="`/adventjs/${year}/${dayInfo.day}`"
          />
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
