import React from "react";

const ServiceDetailsCards: React.FC = () => {
  return (
    <div className="mx-[3.5%] mb-15 p-10 border-[#D4D8D7] bg-white">
      <div className="flex justify-between items-start pb-3">
        <div className="flex">
          <img
            src={"/assets/common/service.svg"}
            alt="icon"
            width={40}
            height={40}
            className="mr-2"
          />
          <div>
            <h2 className="text-lg font-semibold">
              Request for a GCC Certificate of Origin (Export Permit to GCC
              Countries)
            </h2>
            <p className="text-sm mt-1">
              A request to issue a certificate proving that the goods to be
              exported are of Omani origin to GCC countries.
            </p>
          </div>
        </div>
        <div className="text-right font-bold text-xl border border-[#bb1613] px-3 py-1">
          1.5 <span className="text-sm">OMR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-sm text-gray-800">
        <div>
          <div className="mb-8 border-l-2 border-l-[#BB1613] pl-3">
            <h3 className="font-semibold mb-1">Eligibility and Conditions</h3>
            <ul className="list-disc list-inside space-y-1 pl-3">
              <li>The product to be exported must be of Omani origin.</li>
              <li>
                The company must have an industrial license to manufacture the
                product to be exported.
              </li>
            </ul>
          </div>

          <div className="mb-8 border-l-2 border-l-[#BB1613] pl-3">
            <h3 className="font-semibold mb-1">Required Documents</h3>
            <ul className="list-disc list-inside space-y-1 pl-3">
              <li>A copy of the invoice (addressed to the importer)</li>
              <li>A copy of the packing list</li>
              <li>
                A copy of the export declaration (from the first customs point
                only)
              </li>
            </ul>
          </div>

          <div className="mb-8 border-l-2 border-l-[#BB1613] pl-3">
            <h3 className="font-semibold mb-1">
              Contact Points for Completing the Service
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-3">
              <li>
                Department of Commercial Licenses – Ministry of Commerce
                (contact numbers are provided under contact)
              </li>
            </ul>
          </div>

          <div className="mb-8 border-l-2 border-l-[#BB1613] pl-3">
            <h3 className="font-semibold mb-1">
              Other Channels Providing the Service
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-3">
              <li>
                Invest Easy portal:{" "}
                <a
                  href="https://www.business.gov.om/ieasy/wp/ar/"
                  className="text-[#BB1613] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.business.gov.om/ieasy/wp/ar/
                </a>
              </li>
              <li>Sanad service centers</li>
              <li>Authorized service providers</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="flex mt-4">
            <div className="mr-3">
              <img
                src={"/assets/common/workflow.svg"}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Service Workflow</h3>
              <p>2 working days</p>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="mr-3">
              <img
                src={"/assets/common/clock.svg"}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Processing Time</h3>
              <p>Immediate</p>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="mr-3">
              <img
                src={"/assets/common/payment-card.svg"}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Fees</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>1.5 OMR</li>
                <li>Debit Card Only</li>
              </ul>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="mr-3">
              <img
                src={"/assets/common/hourglass.svg"}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Working Hours</h3>
              <p>Weekdays: Sunday – Thursday, 07:30 AM – 02:30 PM</p>
              <p>One-stop station: 08:00 AM – 12:30 PM</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="text-[#BB1613] font-medium hover:underline hover:cursor-pointer">
              View more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsCards;
