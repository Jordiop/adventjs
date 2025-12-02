<script setup lang="ts">
const route = useRoute()
const year = computed(() => route.params.year as string)
const day = computed(() => route.params.day as string)

const { data: exercise, error } = await useFetch(`/api/adventjs/${year.value}/${day.value}`)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Exercise not found'
  })
}

useSeoMeta({
  title: `Day ${day.value} - AdventJS ${year.value}`,
  description: `AdventJS ${year.value} - Day ${day.value} solution`
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="`Day ${day} - AdventJS ${year}`"
        :description="`Solution for day ${day}`"
      >
        <template #links>
          <UButton
            :to="`/adventjs/${year}`"
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="ghost"
            label="Back to list"
          />
        </template>
      </UPageHeader>

      <UPageBody>
        <div class="space-y-8">
          <!-- Exercise Description -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                Challenge
              </h2>
            </template>
            <div class="prose dark:prose-invert max-w-none">
              <MDC :value="exercise?.readme || ''" />
            </div>
          </UCard>

          <!-- Solution Code -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold">
                My Solution
              </h2>
            </template>
            <div class="prose dark:prose-invert max-w-none">
              <MDC :value="`\`\`\`javascript\n${exercise?.script}\n\`\`\``" />
            </div>
          </UCard>
        </div>

        <template #right>
          <UPageLinks
            :title="`Day ${day}`"
            :links="[
              {
                label: 'Previous day',
                icon: 'i-lucide-chevron-left',
                to: `/adventjs/${year}/${parseInt(day) - 1}`,
                disabled: parseInt(day) === 1
              },
              {
                label: 'Next day',
                icon: 'i-lucide-chevron-right',
                to: `/adventjs/${year}/${parseInt(day) + 1}`,
                trailing: true
              }
            ]"
          />
        </template>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
