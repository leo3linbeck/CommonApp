﻿var L3 = L3 || {};L3.localization = {	selectedLanguage: 'en',	//by default we define English as the default language	translations: {		'en': {			'label': {				'{language}': 'Language',				'{address1}': 'Address',				'{address2}': ' ',				'{city}': 'City',				'{zipCode}': 'Zip Code',				'{familyName}': 'Last Name',				'{fatherName}': 'Father Name',				'{motherName}': 'Mother Name',				'{guardianName}': 'Guardian Name',				'{childName}': 'Child Name',				'{childGender}': 'Gender',				'{male}': 'Male',				'{female}': 'Female',				'{childNextGradeLevel}': 'Grade NEXT Year',				'{childBirthdate}': 'Date of Birth',				'{childMultiple}': 'Twin or Triplet?'			},			'richText': {				'richTextSplashDescription': 'Use this system to apply to public and private schools serving grades from Pre-Kindergarten to 12th Grade.</br></br>Fill out one form,</br>and apply to multiple schools!',				'richTextFirstNameTitle': 'First name',				'richTextMiddleNameTitle': 'Middle name',				'componentAddressEntry_richTextStep1': 'Step 1 – Enter and verify your address',				'componentAddressEntry_richTextUSPSTitle': 'Official US Postal Service Address',				'componentFamilyEntry_richTextStep2': 'Step 2 – Enter family information',				'componentChildEntry_richTextStep3': 'Step 3 – Enter child information'			},			'button': {				'buttonStart': 'Click Here to Get Started!',				'buttonGoBack': 'Go Back',				'buttonNextStep': 'Next Step',				'componentAddressEntry_buttonVerifyAddress': 'Verify address'			}		},				'fr': {			'label': {				'{language}': 'Langue',				'{address1}': 'Adresse',				'{address2}': ' ',				'{city}': 'Ville',				'{zipCode}': 'Code postal',				'{familyName}': 'Nom de famille',				'{fatherName}': 'Nom du père',				'{motherName}': 'Nom de la mère',				'{guardianName}': 'Nom du gardien',				'{childName}': "Nom de l'enfant",				'{childGender}': 'Sexe',				'{male}': 'Mâle',				'{female}': 'Femelle',				'{childNextGradeLevel}': "Classe l'année PROCHAINE",				'{childBirthdate}': 'Naissance',				'{childMultiple}': 'Jumeau ou triplet?'			},			'richText': {				'richTextSplashDescription': "Utilisez ce système pour appliquer dans les écoles publiques et privées servir les grades de la pré-maternelle à la 12e année.</br></br>Remplissez un formulaire,</br>et s'appliquent à plusieurs écoles!",				'richTextFirstNameTitle': 'Prénom',				'richTextMiddleNameTitle': 'Deuxième nom',				'componentAddressEntry_richTextStep1': 'Étape 1 - Entrez et vérifiez votre adresse',				'componentAddressEntry_richTextUSPSTitle': 'Officiel US Postal Service Adresse',				'componentFamilyEntry_richTextStep2': 'Étape 2 – Entrez les informations de la famille',				'componentChildEntry_richTextStep3': "Étape 3 – Entrez les informations de l'enfant"			},			'button': {				'buttonStart': 'Cliquez ici pour commencer!',				'buttonGoBack': 'Revenir',				'buttonNextStep': 'Avant',				'componentAddressEntry_buttonVerifyAddress': "Vérifier l'adresse"			}		},		'sp': {			'label': {				'{language}': 'Lengua',				'{address1}': 'Paso',				'{address2}': ' ',				'{city}': 'Ciudad',				'{zipCode}': 'Código postal',				'{familyName}': 'Apellido',				'{fatherName}': 'Nombre de la padre',				'{motherName}': 'Nombre de la madre',				'{guardianName}': 'Nombre del guardián',				'{childName}': 'Nombre del niño',				'{childGender}': 'Sexo',				'{male}': 'Masculino',				'{female}': 'Femenino',				'{childNextGradeLevel}': 'Grado el PRÓXIMO año',				'{childBirthdate}': 'Nacimiento',				'{childMultiple}': 'Gemelos o trillizos?'			},			'richText': {				'richTextSplashDescription': 'Utilice este sistema para aplicar a las escuelas públicas y privadas sirve a los grados de Pre-K al grado 12.</br></br>Llenar un formulario,</br>y se aplican a varias escuelas!',				'richTextFirstNameTitle': 'Primer nombre',				'richTextMiddleNameTitle': 'Segundo nombre',				'componentAddressEntry_richTextStep1': 'Paso 1 - Ingrese y verifique su dirección',				'componentAddressEntry_richTextUSPSTitle': 'Oficial Dirección de US Correos',				'componentFamilyEntry_richTextStep2': 'Paso 2 – Ingrese la información de la familia',				'componentChildEntry_richTextStep3': 'Paso 3 – Ingrese la información del niño'			},			'button': {				'buttonStart': 'Click aqui para empezar!',				'buttonGoBack': 'Regresar',				'buttonNextStep': 'Adelante',				'componentAddressEntry_buttonVerifyAddress': 'Verificar la dirección'			}		}	},	//widgets have not yet been created by WAF	//use jQuery to modify the HTML	changeLanguage: function(language) {		var i, k, t, v;				$('[data-label]').each(			function() {				var translatedValue = L3.localization.translations[language].label[$(this).attr('data-label')],					//translated value of the text					label = '';				if (translatedValue) {					label = $('[for=' + $(this).attr('id') + ']');					//get the ID of the widget that has this label widget attached to it					label.text(translatedValue);					//swap the text of the label with the translated text				}			}		);		t = L3.localization.translations[language].richText;		k = Object.keys(t);		for (i = 0; i < k.length; i += 1) {			v = t[k[i]]				//translated value of the text			if (v) {				$('#'+k[i]).html(v);				//swap the text of the label with the translated text			}		}		t = L3.localization.translations[language].button;		k = Object.keys(t);		for (i = 0; i < k.length; i += 1) {			var v = t[k[i]]				//translated value of the text			if (v) {				$('#'+k[i]).text(v);				//swap the text of the label with the translated text			}		}	}}