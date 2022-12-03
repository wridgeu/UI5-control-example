/**
 * Enum for the possible states of a Box.
 *
 * @typedef {object} com.mrb.customcontrol.controls.BoxVis.BoxState
 * @property {string} ACTIVE
 * @property {string} INACTIVE
 * @property {string} DEFAULT
 */

sap.ui.define([], () => {
	"use strict";

	/**
	 * Possible states of a Box.
	 * @public
	 * @enum {string}
	 */
	return Object.freeze({
		/**
		 * @public
		 */
		ACTIVE: "A",
		/**
		 * @public
		 */
		INACTIVE: "I",
		/**
		 * @public
		 */
		DEFAULT: "D",
	});
});
