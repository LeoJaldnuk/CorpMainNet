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
	<div></div>
</template>

<script>
export default {
	data() {
		return {
			newJob: {
				nameOfJob: "",
				numberInCrew: 1,
				hoursPerDay: 1,
				numberOfDays: 1,
				hourlyWage: 1.00,
                squareFootage: 1,
				otherCosts: {
					materials: 0.00,
					travel: 0.00,
				},
			},
		};
	},
	computed: {
		totalJobHours() {
			const result = this.newJob.numberInCrew.toFixed(2) * this.newJob.hoursPerDay.toFixed(2) * this.newJob.numberOfDays.toFixed(2);
            return result.toFixed(2);
		},
        totalJobLabor() {
            const result = this.totalJobHours() * this.newJob.hourlyWage.toFixed(2);
            return result.toFixed(2);
        },
        totalJobCost() {
            const totalOtherCosts = this.newJob.otherCosts.reduce( (total, cost) => {
                return total + cost;
            });
            const result = this.totalJobLabor() + totalOtherCosts.toFixed(2);
            return result.toFixed(2);
        },
        squareFootCost() {
            const result = this.totalJobCost() / this.newJob.squareFootage;
            return result.toFixed(2);
        }
	},
	methods: {},
};
</script>

<style>
</style>