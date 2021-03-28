<template functional>
	<!-- tornando ele em funcional, retiro a estancia do vue, pois so sera exportado o visual -->
	<section
		class="flex flex-col flex-1 justify-center items-center p-10 md:p-16"
	>
		<h1 class="font-medium text-center text-2xl">
			Comece um novo ciclo para receber novos desafios
		</h1>
		<img
			src="icons/level-up.svg"
			alt="Level up"
			class="mt-10 md:mt-16"
			:style="{ minHeight: '70px' }"
		/>
		<p class="text-center text-md mt-4">
			Aumente seu nível completando desafios
		</p>
	</section>
</template>
