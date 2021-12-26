<!--
data() {
    newJob: {
        nameOfJob: "",
        numberInCrew: 1,
        hoursPerDay: 1,
        numberOfDays: 1,
        hourlyWage: 1
    }
},
computed:

    calculated total job hours
        return this.newJob.numberInCrew * this.newJob.hoursPerDay * this.newJob.numberOfDays
    calculated total job labor cost = calculated total job hours * this.newJob.hourlyWage
-->

<template>
	<div>
		<form>
			<input class="input-box" placeholder="Name of the Job" type="text" v-model="newJob.nameOfJob" />
			<input class="input-box" placeholder="Number in the Crew" type="number" v-model="newJob.numberInCrew" />
			<input class="input-box" placeholder="Hours Per Day" type="number" v-model="newJob.hoursPerDay" />
			<input class="input-box" placeholder="Number of Days" type="number" v-model="newJob.numberOfDays" />
			<p>Calculated Total Job Hours:  {{ totalJobHours }}</p>

			<input class="input-box" placeholder="Hourly Wage" type="number" v-model="newJob.hourlyWage" />

			<p>Calculated Total Job Labor Cost:  {{ totalJobLabor }}</p>
			<input class="input-box" placeholder="Total Job Square Footage" type="number" v-model="newJob.squareFootage" />



			<p>Total Job Cost:  {{ totalJobCost }}</p>

			<p>Calculated Square Foot Cost:  {{ squareFootCost }}</p>

		</form>
	</div>
</template>

<script>
export default {
	name: 'con-tek-calc-comp',
	data() {
		return {
			newJob: {
				nameOfJob: "",
				numberInCrew: 1,
				hoursPerDay: 1,
				numberOfDays: 1,
				hourlyWage: 1.0,
				squareFootage: 1,
				otherCosts: {
					materials: 0.0,
					travel: 0.0,
				},
			},
			
		};
	},
	computed: {
		totalJobHours() {
			const result =
				this.newJob.numberInCrew.toFixed(2) *
				this.newJob.hoursPerDay.toFixed(2) *
				this.newJob.numberOfDays.toFixed(2);
			return result.toFixed(2);
		},
		totalJobLabor() {
			const result = this.totalJobHours() * this.newJob.hourlyWage.toFixed(2);
			return result.toFixed(2);
		},
		totalJobCost() {
			const totalOtherCosts = this.newJob.otherCosts.reduce((total, cost) => {
				return total + cost;
			});
			const result = this.totalJobLabor() + totalOtherCosts.toFixed(2);
			return result.toFixed(2);
		},
		squareFootCost() {
			const result = this.totalJobCost() / this.newJob.squareFootage;
			return result.toFixed(2);
		},
	},
	methods: {
		addOtherCost() {
			
		}
	},
};
</script>

<style>

input-box {
	margin: 3px;
}

input-button {
	margin: 5px;
}

</style>