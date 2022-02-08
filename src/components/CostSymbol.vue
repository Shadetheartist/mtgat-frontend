<template>
	<div class="cost-symbol" :class="`cost-symbol-${cleanSymbol}`">
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

$base-size: 14px;

@mixin cost-symbol-n-position($n){

}

@mixin cost-symbol-n($n) {
	background-position-x: -$base-size * $n;
	background-position-y: floor($n / 10) * -$base-size;
}

.cost-symbol {
	width: $base-size;
	height: $base-size;
	background-image: url("/svg/mana.svg");
	background-size: $base-size * 10;

	$i: 0;
	@while $i <= 20 {
		&.cost-symbol-#{$i} {
			@include cost-symbol-n($i);
		}
		$i: $i + 1;
	}

	&.cost-symbol-X {
		@include cost-symbol-n(21);
	}

	&.cost-symbol-Y {
		@include cost-symbol-n(22);
	}

	&.cost-symbol-Z {
		@include cost-symbol-n(23);
	}

	&.cost-symbol-W {
		@include cost-symbol-n(24);
	}

	&.cost-symbol-U {
		@include cost-symbol-n(25);
	}

	&.cost-symbol-B {
		@include cost-symbol-n(26);
	}

	&.cost-symbol-R {
		@include cost-symbol-n(27);
	}

	&.cost-symbol-G {
		@include cost-symbol-n(28);
	}

	&.cost-symbol-S {
		@include cost-symbol-n(29);
	}

	&.cost-symbol-W_U {
		@include cost-symbol-n(30);
	}

	&.cost-symbol-W_B {
		@include cost-symbol-n(31);
	}

	&.cost-symbol-U_B {
		@include cost-symbol-n(32);
	}

	&.cost-symbol-U_R {
		@include cost-symbol-n(33);
	}

	&.cost-symbol-B_R {
		@include cost-symbol-n(34);
	}

	&.cost-symbol-B_G {
		@include cost-symbol-n(35);
	}

	&.cost-symbol-W_R {
		@include cost-symbol-n(36);
	}

	&.cost-symbol-R_G {
		@include cost-symbol-n(37);
	}

	&.cost-symbol-G_W {
		@include cost-symbol-n(38);
	}

	&.cost-symbol-G_U {
		@include cost-symbol-n(39);
	}


	&.cost-symbol-2_W {
		@include cost-symbol-n(40);
	}

	&.cost-symbol-2_U {
		@include cost-symbol-n(41);
	}

	&.cost-symbol-2_B {
		@include cost-symbol-n(42);
	}

	&.cost-symbol-2_R {
		@include cost-symbol-n(43);
	}

	&.cost-symbol-2_G {
		@include cost-symbol-n(44);
	}

	//ugh hybrid mana symbols SKIP FOR NOW

	&.cost-symbol-W_P {
		@include cost-symbol-n(45);
	}

	&.cost-symbol-U_P {
		@include cost-symbol-n(46);
	}

	&.cost-symbol-B_P {
		@include cost-symbol-n(47);
	}

	&.cost-symbol-R_P {
		@include cost-symbol-n(48);
	}

	&.cost-symbol-G_P {
		@include cost-symbol-n(49);
	}

	&.cost-symbol-T {
		@include cost-symbol-n(50);
	}

	&.cost-symbol-Q {
		@include cost-symbol-n(50);
	}

}
</style>

<script>

import _ from "lodash";

export default {

	props: {
		symbol: {
			type: String
		}
	},
	computed: {
		cleanSymbol() {
			return this.symbol?.replace('{', '').replace('}', '').replace('/', '_')
		}
	},
	methods: {

	},
	mounted() {

	}
}
</script>
