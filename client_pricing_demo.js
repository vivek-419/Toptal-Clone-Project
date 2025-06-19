document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('pricingToggle');
  const standardCard = document.querySelector('.comparison-card.standard');
  const premiumCard = document.querySelector('.comparison-card.premium');
  const standardCost = document.getElementById('standardCost');
  const premiumCost = document.getElementById('premiumCost');
  const costDifference = document.getElementById('costDifference');

  // Add a premium badge if not present
  let premiumBadge = premiumCard.querySelector('.premium-badge');
  if (!premiumBadge) {
    premiumBadge = document.createElement('div');
    premiumBadge.className = 'premium-badge';
    premiumBadge.innerHTML = '<i class="fas fa-crown"></i> Premium Recommended';
    premiumCard.querySelector('.card-header').appendChild(premiumBadge);
    premiumBadge.style.display = 'none';
  }

  function setPremiumMode(isPremium) {
    if (isPremium) {
      // Highlight premium, dim standard
      premiumCard.classList.add('active');
      standardCard.classList.add('dimmed');
      premiumCard.style.transform = 'scale(1.05)';
      premiumCard.style.boxShadow = '0 8px 32px rgba(139,92,246,0.25)';
      standardCard.style.opacity = '0.5';
      // Show only premium cost
      standardCost.parentElement.style.display = 'none';
      premiumCost.parentElement.style.display = '';
      costDifference.parentElement.style.display = '';
      // Show badge
      premiumBadge.style.display = '';
    } else {
      // Reset
      premiumCard.classList.remove('active');
      standardCard.classList.remove('dimmed');
      premiumCard.style.transform = '';
      premiumCard.style.boxShadow = '';
      standardCard.style.opacity = '';
      // Show both costs
      standardCost.parentElement.style.display = '';
      premiumCost.parentElement.style.display = '';
      costDifference.parentElement.style.display = '';
      // Hide badge
      premiumBadge.style.display = 'none';
    }
  }

  toggle.addEventListener('change', function() {
    setPremiumMode(toggle.checked);
  });

  // Set initial state
  setPremiumMode(toggle.checked);
}); 