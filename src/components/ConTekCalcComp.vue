<template>
	<div>
		<h1>ConTek Quote Calculator</h1>
		<form>

			<!-- Make a table out of these -->

			<label for="input-name-of-job" class="input-label">Name of the Job: </label>
			<input id="input-name-of-job" class="input-box" placeholder="Job Name" type="text" v-model="newJob.nameOfJob" />
			<br>
			<label for="input-number-in-crew" class="input-label">Number in the Crew: </label>
			<input id="input-number-in-crew" class="input-box" placeholder="Number in the Crew" type="number" v-model="newJob.numberInCrew" />
			<br>
			<label for="input-hours-per-day" class="input-label">Hours Per Day: </label>
			<input id="input-hours-per-day" class="input-box" placeholder="Hours Per Day" type="number" v-model="newJob.hoursPerDay" />
			<br>
			<label for="input-number-of-days" class="input-label">Number of Days: </label>
			<input id="input-number-of-days" class="input-box" placeholder="Number of Days" type="number" v-model="newJob.numberOfDays" />
			<p>Calculated Total Job Hours:  $ {{ totalJobHours }}</p>

			<label for="input-hourly-wage" class="input-label">Hourly Wage: </label>
			<input id="input-hourly-wage" class="input-box" placeholder="Hourly Wage" type="number" v-model="newJob.hourlyWage" />

			<p>Calculated Total Job Labor Cost:  $ {{ totalJobLabor }}</p>

			<!-- Other Costs -->

			<p>Total Job Cost:  $ {{ totalJobCost }}</p>

			<label for="input-square-footage" class="input-label">Total Square Footage: </label>
			<input id="input-square-footage" class="input-box" placeholder="Total Job Square Footage" type="number" v-model="newJob.squareFootage" />

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
				(Math.round(this.newJob.numberInCrew * 100) / 100) *
				(Math.round(this.newJob.hoursPerDay * 100) / 100) *
				(Math.round(this.newJob.numberOfDays * 100) / 100);
			return Math.round(result * 100) / 100;
		},
		totalJobLabor() {
			const result = this.totalJobHours * (Math.round(this.newJob.hourlyWage * 100) / 100);
			return Math.round(result * 100) / 100;
		},
		totalJobCost() {
			const totalOtherCosts = 0.0;
			// const totalOtherCosts = this.newJob.otherCosts.reduce((total, cost) => {
			// 	return total + cost;
			// });
			const result = this.totalJobLabor + (Math.round(totalOtherCosts * 100) / 100);
			return Math.round(result * 100) / 100;
		},
		squareFootCost() {
			const result = this.totalJobCost / this.newJob.squareFootage;
			return Math.round(result * 100) / 100;
		},
	},
	methods: {
		addOtherCost() {
			
		}
	},
};
</script>

<style>

.input-label {
	margin: 1px;
}

.input-box {
	margin: 3px;
}

.input-button {
	margin: 5px;
}

</style>

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