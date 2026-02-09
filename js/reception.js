// ===== FONCTIONNALITÉS GÉNÉRALES =====

// Navigation mobile
document.addEventListener('DOMContentLoaded', function () {
    // Toggle navigation mobile
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Fermer le menu mobile en cliquant sur un lien
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Initialiser les fonctionnalités spécifiques aux pages
    if (document.querySelector('.reception-hero')) {
        initReceptionPage();
    }

    if (document.querySelector('.offrande-hero')) {
        initOffrandePage();
    }
});

// ===== PAGE RÉCEPTION =====
function initReceptionPage() {
    // Évangile du jour - données
    const evangelData = [
        {
            date: new Date().toISOString().split('T')[0],
            title: "L'amour de Dieu",
            content: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
            verse: "Jean 3:16",
            reference: "La Bible, Nouveau Testament"
        },
        {
            date: "2023-10-28",
            title: "La foi qui sauve",
            content: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.",
            verse: "Éphésiens 2:8",
            reference: "La Bible, Nouveau Testament"
        },
        {
            date: "2023-10-29",
            title: "La paix de Christ",
            content: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.",
            verse: "Jean 14:27",
            reference: "La Bible, Nouveau Testament"
        }
    ];

    // Afficher l'évangile du jour
    const today = new Date().toISOString().split('T')[0];
    let todaysEvangel = evangelData.find(ev => ev.date === today);

    // Si pas d'évangile pour aujourd'hui, prendre le premier
    if (!todaysEvangel) {
        todaysEvangel = evangelData[0];
    }

    // Mettre à jour l'interface
    const evangelTitle = document.getElementById('evangel-title');
    const evangelContent = document.getElementById('evangel-content');
    const evangelVerse = document.getElementById('evangel-verse');

    if (evangelTitle && evangelContent && evangelVerse) {
        evangelTitle.textContent = todaysEvangel.title;
        evangelContent.innerHTML = `
            <p>${todaysEvangel.content}</p>
            <div class="verse">"${todaysEvangel.verse}"</div>
            <p>${todaysEvangel.reference}</p>
        `;
        evangelVerse.textContent = todaysEvangel.verse;
    }

    // Initialiser le calendrier
    initCalendar(evangelData);

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupérer les valeurs du formulaire
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Validation simple
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }

            // Simuler l'envoi du formulaire
            alert(`Merci ${name} ! Votre message a été envoyé. Nous vous répondrons à ${email} dans les plus brefs délais.`);

            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
}

// ===== CALENDRIER DES ÉVANGILES =====
function initCalendar(evangelData) {
    const monthYearElement = document.getElementById('month-year');
    const calendarDatesElement = document.getElementById('calendar-dates');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    // Fonction pour afficher le calendrier
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Mettre à jour le mois et l'année affichés
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        monthYearElement.textContent = `${monthNames[month]} ${year}`;

        // Premier jour du mois
        const firstDay = new Date(year, month, 1);
        // Dernier jour du mois
        const lastDay = new Date(year, month + 1, 0);
        // Jour de la semaine du premier jour (0 = dimanche)
        const firstDayIndex = firstDay.getDay();
        // Nombre de jours dans le mois
        const daysInMonth = lastDay.getDate();

        // Réinitialiser le calendrier
        calendarDatesElement.innerHTML = '';

        // Ajouter les jours de la semaine
        const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            calendarDatesElement.appendChild(dayElement);
        });

        // Ajouter les cases vides avant le premier jour
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'calendar-date';
            calendarDatesElement.appendChild(emptyElement);
        }

        // Ajouter les jours du mois
        const today = new Date().toISOString().split('T')[0];

        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = document.createElement('div');
            dateElement.className = 'calendar-date';
            dateElement.textContent = day;

            // Formater la date pour comparaison
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Vérifier si c'est aujourd'hui
            if (dateString === today) {
                dateElement.classList.add('active');
            }

            // Vérifier s'il y a un évangile pour cette date
            const hasEvangel = evangelData.some(ev => ev.date === dateString);
            if (hasEvangel) {
                dateElement.classList.add('has-evangel');
                dateElement.title = "Évangile disponible pour ce jour";
            }

            dateElement.addEventListener('click', function () {
                // Trouver l'évangile pour cette date
                const selectedEvangel = evangelData.find(ev => ev.date === dateString);

                if (selectedEvangel) {
                    // Afficher l'évangile sélectionné
                    const evangelTitle = document.getElementById('evangel-title');
                    const evangelContent = document.getElementById('evangel-content');
                    const evangelVerse = document.getElementById('evangel-verse');

                    evangelTitle.textContent = selectedEvangel.title;
                    evangelContent.innerHTML = `
                        <p>${selectedEvangel.content}</p>
                        <div class="verse">"${selectedEvangel.verse}"</div>
                        <p>${selectedEvangel.reference}</p>
                    `;
                    evangelVerse.textContent = selectedEvangel.verse;

                    // Faire défiler jusqu'à l'évangile
                    document.querySelector('.evangel-du-jour').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    alert(`Aucun évangile n'est disponible pour le ${day} ${monthNames[month]} ${year}.`);
                }
            });

            calendarDatesElement.appendChild(dateElement);
        }
    }

    // Initialiser le calendrier
    renderCalendar(currentDate);

    // Gestion des boutons précédent/suivant
    prevMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
}

// ===== PAGE OFFRANDE =====
function initOffrandePage() {
    // Gestion des options de montant
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('custom-amount');

    amountOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Retirer la classe active de toutes les options
            amountOptions.forEach(opt => opt.classList.remove('active'));

            // Ajouter la classe active à l'option cliquée
            this.classList.add('active');

            // Mettre à jour l'input personnalisé
            if (this.dataset.amount) {
                customAmountInput.value = this.dataset.amount;
            }
        });
    });

    // Gestion de l'input personnalisé
    customAmountInput.addEventListener('input', function () {
        // Retirer la classe active de toutes les options
        amountOptions.forEach(opt => opt.classList.remove('active'));

        // Si l'input est vide, réactiver l'option par défaut
        if (!this.value) {
            document.querySelector('.amount-option[data-amount="5000"]').classList.add('active');
        }
    });

    // Gestion du formulaire de don
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupérer les valeurs du formulaire
            const amount = document.getElementById('custom-amount').value;
            const name = document.getElementById('donor-name').value;
            const email = document.getElementById('donor-email').value;
            const prayer = document.getElementById('donation-prayer').value;

            // Validation
            if (!amount || amount <= 0) {
                alert('Veuillez spécifier un montant valide pour votre offrande.');
                return;
            }

            if (!name || !email) {
                alert('Veuillez remplir vos informations personnelles.');
                return;
            }

            // Simuler le traitement du don
            const formattedAmount = parseInt(amount).toLocaleString();
            alert(`Merci ${name} pour votre offrande de ${formattedAmount} FCFA !\n\nUn email de confirmation a été envoyé à ${email}.\n\nQue Dieu vous bénisse abondamment !`);

            // Réinitialiser le formulaire
            donationForm.reset();
            document.querySelector('.amount-option[data-amount="5000"]').classList.add('active');
        });
    }

    // Générer des versets bibliques aléatoires
    const bibleVerses = [
        {
            text: "Donnez, et il vous sera donné: on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde; car on vous mesurera avec la mesure dont vous vous serez servis.",
            reference: "Luc 6:38"
        },
        {
            text: "Honore l'Éternel avec tes biens, et avec les prémices de tout ton revenu: alors tes greniers seront remplis d'abondance, et tes cuves regorgeront de moût.",
            reference: "Proverbes 3:9-10"
        },
        {
            text: "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie.",
            reference: "2 Corinthiens 9:7"
        },
        {
            text: "Apportez à la maison du trésor toutes les dîmes, afin qu'il y ait de la nourriture dans ma maison; mettez-moi de la sorte à l'épreuve, dit l'Éternel des armées. Et vous verrez si je n'ouvre pas pour vous les écluses des cieux, si je ne répands pas sur vous la bénédiction en abondance.",
            reference: "Malachie 3:10"
        },
        {
            text: "Celui qui sème peu moissonnera peu, et celui qui sème abondamment moissonnera abondamment.",
            reference: "2 Corinthiens 9:6"
        },
        {
            text: "Celui qui donne au pauvre n'éprouve pas la disette, mais celui qui ferme les yeux est chargé de malédictions.",
            reference: "Proverbes 28:27"
        }
    ];

    // Afficher les versets
    const versesContainer = document.getElementById('bible-verses-container');
    if (versesContainer) {
        bibleVerses.forEach(verse => {
            const verseElement = document.createElement('div');
            verseElement.className = 'verse-card';
            verseElement.innerHTML = `
                <div class="verse-text">"${verse.text}"</div>
                <div class="verse-reference">${verse.reference}</div>
            `;
            versesContainer.appendChild(verseElement);
        });
    }
}