(function ($) {
	'use strict';

	if (typeof muiruriShippingData === 'undefined') {
		return;
	}

	var cfg = muiruriShippingData;
	var fields = cfg.fields || {};
	var modes = cfg.modes || {};
	var actions = cfg.actions || {};
	var i18n = cfg.i18n || {};
	var shouldRestoreScroll = false;
	var savedScrollTop = 0;
	var restoreScrollTimer = null;

	function byField(fieldName) {
		return $('#' + fieldName);
	}

	function rememberScroll() {
		savedScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
		shouldRestoreScroll = true;
	}

	function restoreScrollIfNeeded() {
		if (!shouldRestoreScroll) {
			return;
		}
		window.scrollTo(0, savedScrollTop);
		shouldRestoreScroll = false;
	}

	function updateCheckout() {
		rememberScroll();
		$(document.body).trigger('update_checkout');
	}

	function setHiddenName(selectField, hiddenField) {
		var $select = byField(selectField);
		var $hidden = byField(hiddenField);
		if (!$select.length || !$hidden.length) {
			return;
		}

		var text = '';
		if ($select.val()) {
			text = $.trim($select.find('option:selected').text() || '');
		}
		$hidden.val(text);
	}

	function clearSelect(selectField, placeholder) {
		var $select = byField(selectField);
		if (!$select.length) {
			return;
		}
		$select.empty().append(
			$('<option/>').attr('value', '').text(placeholder)
		);
	}

	function fillSelect(selectField, items, placeholder) {
		var $select = byField(selectField);
		if (!$select.length) {
			return '';
		}

		var current = $select.val();
		clearSelect(selectField, placeholder);

		$.each(items || [], function (_, item) {
			if (!item || !item.id) {
				return;
			}
			$select.append(
				$('<option/>').attr('value', item.id).text(item.name || ('#' + item.id))
			);
		});

		if (current && $select.find('option[value="' + current + '"]').length) {
			$select.val(current);
			return current;
		}

		if ((items || []).length === 1) {
			var singleValue = String(items[0].id);
			$select.val(singleValue);
			return singleValue;
		}

		return $select.val() || '';
	}

	function requestItems(actionName, payload, onSuccess) {
		var postData = $.extend({}, payload || {}, {
			action: actionName,
			nonce: cfg.nonce
		});

		$.post(cfg.ajaxUrl, postData)
			.done(function (resp) {
				if (!resp || !resp.success || !resp.data) {
					onSuccess([]);
					return;
				}
				onSuccess(resp.data.items || []);
			})
			.fail(function () {
				onSuccess([]);
			});
	}

	function resetAgentChain() {
		clearSelect(fields.location, i18n.selectLocation || 'Select location');
		clearSelect(fields.agent, i18n.selectAgent || 'Select agent');
		byField(fields.locationName).val('');
		byField(fields.agentName).val('');
	}

	function resetDoorstepChain() {
		clearSelect(fields.destination, i18n.selectDestination || 'Select destination');
		byField(fields.destinationName).val('');
	}

	function updateSequentialVisibility() {
		var mode = byField(fields.mode).val() || '';
		var type = byField(fields.pickupType).val() || '';
		var zone = byField(fields.zone).val() || '';
		var location = byField(fields.location).val() || '';
		var area = byField(fields.area).val() || '';
		var destination = byField(fields.destination).val() || '';

		$('.scd-mode-details').hide();
		$('.scd-pickup-agent-fields .scd-field-zone, .scd-pickup-agent-fields .scd-field-location, .scd-pickup-agent-fields .scd-field-agent').hide();
		$('.scd-pickup-doorstep-fields .scd-field-area, .scd-pickup-doorstep-fields .scd-field-destination, .scd-pickup-doorstep-fields .scd-field-location-description').hide();

		if (mode === modes.shop) {
			$('.scd-mode-shop').show();
			return;
		}

		if (mode === modes.custom) {
			$('.scd-mode-custom').show();
			return;
		}

		if (mode !== modes.pickup) {
			return;
		}

		$('.scd-mode-pickupmtaani').show();

		if (type === 'agent') {
			$('.scd-pickup-agent-fields').show();
			$('.scd-pickup-agent-fields .scd-field-zone').show();
			if (zone) {
				$('.scd-pickup-agent-fields .scd-field-location').show();
			}
			if (location) {
				$('.scd-pickup-agent-fields .scd-field-agent').show();
			}
			return;
		}

		if (type === 'doorstep') {
			$('.scd-pickup-doorstep-fields').show();
			$('.scd-pickup-doorstep-fields .scd-field-area').show();
			if (area) {
				$('.scd-pickup-doorstep-fields .scd-field-destination').show();
			}
			if (destination) {
				$('.scd-pickup-doorstep-fields .scd-field-location-description').show();
			}
		}
	}

	function loadZones() {
		requestItems(actions.zones, {}, function (items) {
			var selected = fillSelect(fields.zone, items, i18n.selectZone || 'Select zone');
			setHiddenName(fields.zone, fields.zoneName);
			updateSequentialVisibility();

			if (selected) {
				loadLocations(selected);
			} else {
				resetAgentChain();
				updateSequentialVisibility();
			}

			updateCheckout();
		});
	}

	function loadLocations(zoneId) {
		resetAgentChain();
		updateSequentialVisibility();

		if (!zoneId) {
			updateCheckout();
			return;
		}

		requestItems(actions.locations, { zone_id: zoneId }, function (items) {
			var selected = fillSelect(fields.location, items, i18n.selectLocation || 'Select location');
			setHiddenName(fields.location, fields.locationName);
			updateSequentialVisibility();

			if (selected) {
				loadAgents(selected);
			} else {
				clearSelect(fields.agent, i18n.selectAgent || 'Select agent');
				byField(fields.agentName).val('');
				updateSequentialVisibility();
				updateCheckout();
			}
		});
	}

	function loadAgents(locationId) {
		clearSelect(fields.agent, i18n.selectAgent || 'Select agent');
		byField(fields.agentName).val('');
		updateSequentialVisibility();

		if (!locationId) {
			updateCheckout();
			return;
		}

		requestItems(actions.agents, { location_id: locationId }, function (items) {
			fillSelect(fields.agent, items, i18n.selectAgent || 'Select agent');
			setHiddenName(fields.agent, fields.agentName);
			updateSequentialVisibility();
			updateCheckout();
		});
	}

	function loadAreas() {
		requestItems(actions.areas, {}, function (items) {
			var selected = fillSelect(fields.area, items, i18n.selectArea || 'Select area');
			setHiddenName(fields.area, fields.areaName);
			updateSequentialVisibility();

			if (selected) {
				loadDestinations(selected);
			} else {
				resetDoorstepChain();
				byField(fields.locationDescription).val('');
				updateSequentialVisibility();
				updateCheckout();
			}
		});
	}

	function loadDestinations(areaId) {
		resetDoorstepChain();
		byField(fields.locationDescription).val('');
		updateSequentialVisibility();

		if (!areaId) {
			updateCheckout();
			return;
		}

		requestItems(actions.destinations, { area_id: areaId }, function (items) {
			fillSelect(fields.destination, items, i18n.selectDestination || 'Select destination');
			setHiddenName(fields.destination, fields.destinationName);
			updateSequentialVisibility();
			updateCheckout();
		});
	}

	function onModeChanged() {
		var mode = byField(fields.mode).val() || '';

		if (mode !== modes.pickup) {
			byField(fields.pickupType).val('');
			clearSelect(fields.zone, i18n.selectZone || 'Select zone');
			resetAgentChain();
			clearSelect(fields.area, i18n.selectArea || 'Select area');
			resetDoorstepChain();
			byField(fields.locationDescription).val('');
			byField(fields.zoneName).val('');
			byField(fields.locationName).val('');
			byField(fields.agentName).val('');
			byField(fields.areaName).val('');
			byField(fields.destinationName).val('');
		}

		updateSequentialVisibility();
		updateCheckout();
	}

	function onPickupTypeChanged() {
		var type = byField(fields.pickupType).val() || '';

		clearSelect(fields.zone, i18n.selectZone || 'Select zone');
		resetAgentChain();
		clearSelect(fields.area, i18n.selectArea || 'Select area');
		resetDoorstepChain();
		byField(fields.locationDescription).val('');
		byField(fields.zoneName).val('');
		byField(fields.locationName).val('');
		byField(fields.agentName).val('');
		byField(fields.areaName).val('');
		byField(fields.destinationName).val('');

		updateSequentialVisibility();

		if (type === 'agent') {
			loadZones();
			return;
		}

		if (type === 'doorstep') {
			loadAreas();
			return;
		}

		updateCheckout();
	}

	$(function () {
		$(document.body).on('updated_checkout checkout_error', function () {
			if (!shouldRestoreScroll) {
				return;
			}

			if (restoreScrollTimer) {
				window.clearTimeout(restoreScrollTimer);
			}

			restoreScrollTimer = window.setTimeout(function () {
				restoreScrollIfNeeded();
			}, 0);
		});

		updateSequentialVisibility();

		var mode = byField(fields.mode).val() || '';
		var pickupType = byField(fields.pickupType).val() || '';
		if (mode === modes.pickup) {
			if (pickupType === 'agent') {
				loadZones();
			}
			if (pickupType === 'doorstep') {
				loadAreas();
			}
		}

		byField(fields.mode).on('change', onModeChanged);
		byField(fields.customDetails).on('input', updateCheckout);
		byField(fields.pickupType).on('change', onPickupTypeChanged);

		byField(fields.zone).on('change', function () {
			setHiddenName(fields.zone, fields.zoneName);
			loadLocations($(this).val() || '');
		});

		byField(fields.location).on('change', function () {
			setHiddenName(fields.location, fields.locationName);
			loadAgents($(this).val() || '');
		});

		byField(fields.agent).on('change', function () {
			setHiddenName(fields.agent, fields.agentName);
			updateSequentialVisibility();
			updateCheckout();
		});

		byField(fields.area).on('change', function () {
			setHiddenName(fields.area, fields.areaName);
			loadDestinations($(this).val() || '');
		});

		byField(fields.destination).on('change', function () {
			setHiddenName(fields.destination, fields.destinationName);
			updateSequentialVisibility();
			updateCheckout();
		});

		byField(fields.locationDescription).on('input', updateCheckout);
	});
})(jQuery);
