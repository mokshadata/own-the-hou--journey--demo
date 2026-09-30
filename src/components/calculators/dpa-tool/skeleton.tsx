import MoneyInput, { moneyMask } from "../shared/money-input"
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from "~/components/ui/slider"

import { getMatchingPrograms } from "./calculate";
import { createEffect, For } from "solid-js";
import { targetHomePrice } from "../store";

export function cohHomebuyerAssistanceProgram() {
  return <div>
    <p>
      The City of Houston offers up to $50,000 to income-qualified residents.
    </p>
    <p>
      The City assists first-time homebuyers who buy a home within the city limits through their Homebuyer Assistance Program.
    </p>
    <p>
      For more information, please visit: https://houstontx.gov/housing/hap.html
    </p>
    <p>
      If you have questions or want to talk to someone with the City of Houston Housing and Community Development about this program, give them a call at 832-394-6200.
    </p>
  </div>
}

export function HCLTProgram() {
  return <div>
    <p>
      With the Houston Community Land Trust Homebuyer Choice Program, a qualified homebuyer can receive up to $150,000 or $100,000 in financial assistance grants to help lower the cost of buying a high-quality home in the City of Houston that meets the program criteria. 
    </p>
    <p>
      The homebuyer contributes what they can afford to their home purchase, usually in the form of a standard mortgage. The financial assistance grant helps cover the rest of the home's purchase price, as well as the buyer's reasonable closing costs.
    </p>
    <p>
      For more information, please visit: https://www.houstonclt.org/
    </p>
    <p>
      If you have questions or want to talk to someone with the Houston Community Land Trust about this program, give them a call at 713-512-5575.
    </p>
  </div>
}

export function hcDPAProgram() {
  return <div>
    <p>
      Harris County offers up to $40,000 towards the purchase of new and pre-existing homes in the unincorporated areas of Harris County.  
    </p>
    <p>
      For more information, please visit: https://csd.harriscountytx.gov/Housing-and-Community-Development/Programs-and-Services/Downpayment-Assistance-Program
    </p>
    <p>
      If you have questions or want to talk to someone with the Harris County Community Services Department about this program, give them a call at 713-578-2000.
    </p>
  </div>
}

export function texasHomebuyerProgram(targetHomePrice) {
  return <div>
    <p>
      The State of Texas offers up to 5% of the purchase price of your home (${targetHomePrice()}), which for you would be <strong>${0.05 * targetHomePrice()}</strong>.
    </p>
    <p>
      For more information, please visit:  https://thetexashomebuyerprogram.com/
    </p>
    <p>
      If you have questions or want to talk to someone with the Texas Department of Housing and Community Affairs about this program, give them a call at 1-800-792-1119.
    </p>
  </div>
}

export function tsahcProgram(targetHomePrice) {
  return <div>
    <p>
      The Texas State Affordable Housing Corporation offers up to 5% of the purchase price of your home (${targetHomePrice()}), which for you would be <strong>${0.05 * targetHomePrice()}</strong>.
    </p>
    <p>
      For more information, please visit: https://www.tsahc.org/home-buyer-programs
    </p>
    <p>
      If you have questions or want to talk to someone with the Texas State Affordable Housing Corporation about this program, give them a call at 1-877-508-4611.
    </p>
  </div>
}

const programNameToDesc = {
  'City of Houston Homebuyer Assistance': (targetHomePrice) => cohHomebuyerAssistanceProgram(targetHomePrice),
  'Houston Community Land Trust': (targetHomePrice) => HCLTProgram(targetHomePrice),
  'Harris County Down Payment Assistance Program': (targetHomePrice) => hcDPAProgram(targetHomePrice),
  'The Texas Homebuyer Program': (targetHomePrice) => texasHomebuyerProgram(targetHomePrice),
  'Texas State Affordable Housing Corporation': (targetHomePrice) => tsahcProgram(targetHomePrice),
}

export default function DPAToolSkeleton({
  handleHouseholdIncomeValue, householdIncomeValue,
  handleHouseholdSizeValue, householdSizeValue,
  targetHomePrice,
}) {

  const setHouseholdSize = (values) => {
    handleHouseholdSizeValue(values[0])
  }

  const programs = () => (getMatchingPrograms(householdSizeValue(), householdIncomeValue()))

    return (
        <div class="workbook--exercise">
            <div class="row">
                <div class="col-xs-12 col-md-6 col between-md">
                    <div class="workbook--exercise--explanation">
                        <p>
                            How many people are part of your household?
                        </p>
                    </div>
                    <div class="workbook--exercise--calc">
                      <Slider
                        minValue={1}
                        maxValue={10}
                        step={1}
                        class="w-full space-y-3"
                        onChangeEnd={setHouseholdSize}
                      >
                        <div class="flex w-full justify-between">
                          <SliderValueLabel />
                        </div>
                        <SliderTrack class="bg-slate-100 border-slate-950 border-2">
                          <SliderFill />
                          <SliderThumb class="border-slate-950 border-2"/>
                        </SliderTrack>
                      </Slider>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 col between-md">
                    <div class="workbook--exercise--explanation">
                        <p>
                            Household income is the total income of all of the people who live together (and are older than 15), even if they are not related to each other.
                        </p>
                    </div>
                    <div class="workbook--exercise--calc">
                        <MoneyInput
                            prefix="decision--c03-budget--annual-income"
                            item={{
                                setting: {
                                    key: 'value',
                                },
                                rate: householdIncomeValue,
                                setter: handleHouseholdIncomeValue,
                            }}
                            step={1000}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div class="workbook--exercise--explanation">
                    <h3>
                        You may be eligible for the following programs!
                    </h3>
                </div>
                <div class="workbook--exercise--calc workbook--exercise--calc--result">
                  <For each={programs()}>{(item, index) => (
                    <section>
                      <h4>{item.program}</h4>
                      {programNameToDesc[item.program](targetHomePrice)}
                    </section>
                  )}</For>
                </div>
            </div>
        </div>
    )
}