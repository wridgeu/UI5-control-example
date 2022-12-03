/**
 * Enum for the possible Orientations of a Bin
 *
 * @typedef {object} com.mrb.customcontrol.controls.BoxVis.BoxOrientation
 * @property {string} RIGHT
 * @property {string} LEFT
 */

sap.ui.define([], () => {
	"use strict";

	/**
	 * Possible orientation of a bin.
	 * @public
	 * @enum {string}
	 */
	return Object.freeze({
		/**
		 * @public
		 *
		 * Right means that the boxes
		 * are ordered in sequence
		 * [1,2]
		 * [3,4]
		 */
		RIGHT: "RE",
		/**
		 * @public
		 *
		 * Left means that the boxes
		 * are ordered in reverse sequence
		 * [4,3]
		 * [2,1]
		 */
		LEFT: "LI",
	});
});
