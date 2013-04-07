﻿var localization = {	selectedLanguage: 'en',	//by default we define English as the default language	translations: {		'en': {			'{language}': 'Language',			'{splashMessage}': 'Use this system to apply to public and private schools</br>serving grades from Pre-Kindergarten to 12th Grade.</br></br></br>Fill out one form,</br>and apply to multiple schools!',			'{step1Text}': 'Step 1 – Enter and verify your address',			'{address}': 'Address',			'{city}': 'City',			'{zipCode}': 'Zip Code',			'{uspsTitle}': 'Official US Postal Service Address',			'{verifyAddress}': 'Verify address',			'{lastName}': 'Last Name',			'{firstName}': 'First Name',			'{telephone}': 'Telephone'		},				'fr': {			'{language}': 'Langue',			'{splashMessage}': "Utilisez ce système pour appliquer dans les écoles publiques et privées</br>servir les grades de la pré-maternelle à la 12e année.</br></br></br>Remplissez un formulaire,</br>et s'appliquent à plusieurs écoles!",			'{step1Text}': 'Étape 1 - Entrez et vérifiez votre adresse',			'{address}': 'Adresse',			'{city}': 'Ville',			'{zipCode}': 'Code postal',			'{uspsTitle}': 'Officiel US Postal Service Adresse',			'{verifyAddress}': "Vérifier l'adresse",			'{lastName}': 'Nom',			'{firstName}': 'Prénom',			'{telephone}': 'Téléphone'		},		'sp': {			'{language}': 'Lengua',			'{splashMessage}': 'Utilice este sistema para aplicar a las escuelas públicas y privadas</br>sirve a los grados de Pre-Kindergarten al grado 12.</br></br></br>Llenar un formulario,</br>y se aplican a varias escuelas!',			'{step1Text}': 'Paso 1 - Ingrese y verifique su dirección',			'{address}': 'Paso',			'{city}': 'Ciudad',			'{zipCode}': 'Código postal',			'{uspsTitle}': 'Oficial Dirección de US Correos',			'{verifyAddress}': 'Verificar la dirección',			'{lastName}': 'Last Name',			'{firstName}': 'First Name',			'{telephone}': 'Telephone'		}	},	//widgets have not yet been created by WAF	//use jQuery to modify the HTML	changeLanguage: function(language) {		$('[data-label]').each(		function() {			var translatedValue = localization.translations[language][$(this).attr('data-label')],				//translated value of the text				label = '';			if (translatedValue) {				label = $('[for=' + $(this).attr('id') + ']');				//get the ID of the widget that has this label widget attached to it				label.text(translatedValue);				//swap the text of the label with the translated text			}		});	}}