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

			<label for="input-hourly-wage" class="input-label">Hourly Wage: $</label>
			<input id="input-hourly-wage" class="input-box" placeholder="Hourly Wage" type="number" v-model="newJob.hourlyWage" />

			<p>Calculated Total Job Labor Cost:  $ {{ totalJobLabor }}</p>

			<p>Other Costs:</p>
			<div class="other-cost-box" v-for="cost in newJob.otherCosts" v-bind:key="cost.id">
				<div v-bind:class="[ otherCostChangeType == cost.type ? '' : 'hidden' ]">
					<input class="input-box" type="text" placeholder="Cost Type" v-model="otherCostChangeNewType" />
					<input class="input-box" type="number" placeholder="Cost Amount" v-model="otherCostChangeAmount" />
					<button v-on:click.prevent=" saveOtherCostEdit() ">Save Changes</button>
					<button v-on:click.prevent=" deleteOtherCostEdit() ">Delete Cost</button>
				</div>
				<div v-bind:class="{ hidden : otherCostChangeType == cost.type }">
					<p>{{ cost.type }}:  $ {{ cost.amount }}</p>
					<button v-on:click.prevent=" otherCostEdit(cost) ">Change</button>
				</div>
			</div>
			<div>
				<button v-if=" addingOtherCost == false " v-on:click.prevent=" toggleOtherCostAdd() ">Add Cost</button>
				<div v-if=" addingOtherCost == true">
					<input class="input-box" type="text" placeholder="Cost Type" v-model="otherCostAddType" />
					<input class="input-box" type="number" placeholder="Cost Amount" v-model="otherCostAddAmount" />
					<button v-on:click.prevent=" saveOtherCostAdd() ">Save Cost</button>
					<button v-on:click.prevent=" toggleOtherCostAdd() ">Cancel</button>
				</div>
			</div>

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
				otherCosts: [
					{
						'type': 'Materials',
						'amount': 0.0
					},
					{
						'type': 'Travel',
						'amount': 0.0
					}
				],
			},
			otherCostChangeType: '',
			otherCostChangeNewType: '',
			otherCostChangeAmount: 0.0,
			addingOtherCost: false,
			otherCostAddType: '',
			otherCostAddAmount: 0.0
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
			const costAmountArray = [];
			this.newJob.otherCosts.forEach((cost) => {
				costAmountArray.push(parseInt(cost.amount));
			});
			const totalOtherCosts = costAmountArray.reduce((total, amount) => {
				return total += amount;
			});
			const result = this.totalJobLabor + (Math.round(totalOtherCosts * 100) / 100);
			return Math.round(result * 100) / 100;
		},
		squareFootCost() {
			const result = this.totalJobCost / this.newJob.squareFootage;
			return Math.round(result * 100) / 100;
		},
	}, // end of computed
	methods: {
		toggleOtherCostAdd() {
			this.addingOtherCost = !this.addingOtherCost;
			this.otherCostAddType = '';
			this.otherCostAddAmount = 0.0;
		},
		saveOtherCostAdd() {
			if (this.checkIfDuplicateType(this.otherCostAddType) == false) {
				const newCost = {'type': this.otherCostAddType, 'amount': this.otherCostAddAmount};
				this.newJob.otherCosts.push(newCost);
				this.toggleOtherCostAdd();
			} else {
				alert('Other Cost Type names must be unique!')
			}
		},
		otherCostEdit(cost) {
			this.otherCostChangeType = cost.type;
			this.otherCostChangeNewType = cost.type;
			this.otherCostChangeAmount = cost.amount;
		},
		saveOtherCostEdit() {
			if (this.checkIfDuplicateType(this.otherCostChangeNewType, true) == false) {
				const costIndex = this.newJob.otherCosts.findIndex((cost) => cost.type == this.otherCostChangeType);
				this.newJob.otherCosts[costIndex].type = this.otherCostChangeNewType;
				this.newJob.otherCosts[costIndex].amount = this.otherCostChangeAmount;
				this.otherCostChangeType = '';
				this.otherCostChangeNewType = '';
				this.otherCostChangeAmount = 0.0;
			} else {
				alert('Other Cost Type names must be unique!')
			}
		},
		deleteOtherCostEdit() {
			const costIndex = this.newJob.otherCosts.findIndex((cost) => cost.type == this.otherCostChangeType);
			this.newJob.otherCosts.splice(costIndex, 1);
			this.otherCostChangeType = '';
			this.otherCostChangeNewType = '';
			this.otherCostChangeAmount = 0.0;
		},
		checkIfDuplicateType(costType, forCostEdit = false) {
			let duplicatedType = false;
			const costTypesArray = [];
			this.newJob.otherCosts.forEach((cost) => {
				costTypesArray.push(cost.type);
			});
			let countOfCostType = 0;
			for (let i = 0; i < costTypesArray.length; i ++) {
				if (costTypesArray[i] == costType) {
					countOfCostType ++;
				}
			}
			if (countOfCostType > 0) {
				if ((forCostEdit == false && countOfCostType >= 1) || (forCostEdit == true && countOfCostType >= 2)) {
					duplicatedType = true;
				}
			}
			return duplicatedType;
		}
	}, //end of methods
};
</script>

<style>

.other-cost-box {
	border: 1px black solid;
}

.input-label {
	margin: 1px;
}

.input-box {
	margin: 3px;
}

.input-button {
	margin: 5px;
}

.hidden {
	display: none;
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