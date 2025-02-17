/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { showError, showSuccess } from '@nextcloud/dialogs'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

export default {
	data() {
		return {
			copied: false,
			copyLoading: false,
			copySuccess: false,
		}
	},
	computed: {
		copyLinkIcon() {
			if (this.copySuccess) {
				return 'icon-checkmark'
			}
			if (this.copyLoading) {
				return 'icon-loading-small'
			}
			return 'icon-public'
		},
	},

	methods: {
		async copyToClipboard(url) {
			// change to loading status
			this.copyLoading = true

			// copy link to clipboard
			try {
				await this.$copyText(url)
				this.copySuccess = true
				this.copied = true

				// Notify success
				showSuccess(t('contacts', 'Link copied to the clipboard'))
			} catch (error) {
				this.copySuccess = false
				this.copied = true
				showError(t('contacts', 'Could not copy link to the clipboard.'))
			} finally {
				this.copyLoading = false
				setTimeout(() => {
					// stop loading status regardless of outcome
					this.copied = false
					this.copySuccess = false
				}, 2000)
			}
		},
	},
}
