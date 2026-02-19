

import WelcomeGraphic from '../../assets/diagrams/c01--welcome'
import WhatsYourBudgetGraphic from '../../assets/diagrams/c02--whats-your-budget'
import HomebuyingTeamGraphic from '../../assets/diagrams/c03--choose-your-homebuying-team'
import PreapprovalGraphic from '../../assets/diagrams/c04--get-preapproved-for-a-mortgage'
import OfferGraphic from '../../assets/diagrams/c05--find-a-home-and-make-an-offer'
import FinalizeYourMortgageGraphic from '../../assets/diagrams/c06--finalize-your-mortgage'
import ClosingGraphic from '../../assets/diagrams/c07--close-on-your-home'
import HomeownershipGraphic from '../../assets/diagrams/c08--youre-a-homeowner--protect-your-home'

const diagrams = {
  'c01-welcome': WelcomeGraphic,
  'c03-what-s-your-budget': WhatsYourBudgetGraphic,
  'c04-choose-your-homebuying-team': HomebuyingTeamGraphic,
  'c05-get-pre-approved-for-a-mortgage': PreapprovalGraphic,
  'c06-find-a-home-and-make-an-offer': OfferGraphic,
  'c07-finalize-your-mortgage': FinalizeYourMortgageGraphic,
  'c08-close-on-your-home': ClosingGraphic,
  'c09-you-re-a-homeowner-protect-your-home': HomeownershipGraphic,
}

export default function ({ chapterID }) {
  return diagrams[chapterID]
}