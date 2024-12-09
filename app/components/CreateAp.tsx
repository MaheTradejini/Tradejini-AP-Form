"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon, User, Phone } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
// import { createAP } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, partnerSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadButton, UploadDropzone  } from "../utils/uploadthing"
import { createAP } from "../actions";

// interface iAppProps {
//   firstName: string;
//   lastName: string;
//   address: string;
//   email: string;
// }

export function CreateAP() {
    const [lastResult, action] = useActionState(createAP, undefined);
    const [form, fields] = useForm({
      lastResult,

      onValidate({ formData }) {
        return parseWithZod(formData, {
          schema: partnerSchema,
        });
      },

      shouldValidate: "onBlur",
      shouldRevalidate: "onInput",
    });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gender, setGender] = useState("SELECT");
  const [mstatus, setMstatus] = useState("SELECT");
  const [educate, setEducate] = useState("SELECT");
  const [instates, setInstates] = useState("Karnataka");


  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.dob.name}
            value={selectedDate.toISOString()}
          />

          {/* <input type="hidden" name={fields} value={calcualteTotal} /> */}

          <div>
            <h2 className="text-lg font-semibold mb-4">Identity Details</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label>Name of the Applicant</Label>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    <User />
                  </span>
                  <Input
                    name={fields.applicantName.name}
                    key={fields.applicantName.key}
                    defaultValue={fields.applicantName.initialValue}
                    className="rounded-l-none"
                    placeholder="Name"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.applicantName.errors}</p>
              </div>
              <div>
                <Label>Father&apos;s Name</Label>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    <User />
                  </span>
                  <Input
                    name={fields.fatherName.name}
                    key={fields.fatherName.key}
                    defaultValue={fields.fatherName.initialValue}
                    className="rounded-l-none"
                    placeholder="Father's Name"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.fatherName.errors}</p>
              </div>

              <div>
                <Label>Father&apos;s Mobile</Label>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    <Phone />
                  </span>
                  <Input
                    name={fields.fatherMobile.name}
                    key={fields.fatherMobile.key}
                    defaultValue={fields.fatherMobile.initialValue}
                    className="rounded-l-none"
                    placeholder="Father's Mobile Number"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.fatherMobile.initialValue}</p>
              </div>

              <div>
                <Label>Mother&apos;s Name</Label>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    <User />
                  </span>
                  <Input
                    name={fields.motherName.name}
                    key={fields.motherName.key}
                    defaultValue={fields.motherName.initialValue}
                    className="rounded-l-none"
                    placeholder="Mother's Name"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.motherName.errors}</p>
              </div>

              <div>
                <Label>Mother&apos;s Mobile</Label>
                <div className="flex">
                  <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                    <Phone />
                  </span>
                  <Input
                    name={fields.motherMobile.name}
                    key={fields.motherMobile.key}
                    defaultValue={fields.motherMobile.initialValue}
                    className="rounded-l-none"
                    placeholder="Mother's Mobile Number"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.motherMobile.errors}</p>
              </div>

              <div>
                <div>
                  <Label>Date of Birth</Label>
                </div>
                <DatePicker />
                <p className="text-red-500 text-sm">{fields.dob.errors}</p>
              </div>

              <div>
                <Label>Gender</Label>
                <Select
                  defaultValue="SELECT"
                  name={fields.gender.name}
                  key={fields.gender.key}
                  onValueChange={(value) => setGender(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SELECT">Select</SelectItem>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.gender.errors}</p>
              </div>

              <div>
                <Label>Marital Status</Label>
                <Select
                  defaultValue="SELECT"
                  name={fields.maritalStatus.name}
                  key={fields.maritalStatus.key}
                  onValueChange={(value) => setMstatus(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SELECT">Select</SelectItem>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="MARRIED">Married</SelectItem>
                    <SelectItem value="DIVORCED">Divorced</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.maritalStatus.errors}</p>
              </div>

              <div>
                <Label>Pan Card</Label>
                <span className="text-xs"> (PDF, Self attested)</span>
                {/* <Input type="file" name="panUpload" className="rounded-md" /> */}
                <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    console.log("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                
                <p className="text-red-500 text-sm">{fields.panUpload.errors}</p>
              </div>

              <div>
                <Label>Latest Education Certificate</Label>
                <span className="text-xs"> (PDF, Self attested)</span>
                <Input
                  type="file"
                  name="educationUpload"
                  className="rounded-md"
                />
                <p className="text-red-500 text-sm">{fields.educationUpload.errors}</p>
              </div>

              <div>
                <Label>Photograph</Label>
                <span className="text-xs">
                  {" "}
                  (PDF, Only Passport Size Photo)
                </span>
                <Input type="file" name="photoUpload" className="rounded-md" />
                <p className="text-red-500 text-sm">{fields.photoUpload.errors}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Address Details</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>Registered Address 1</Label>
                <div className="flex">
                  <Input
                    name={fields.address.name}
                    key={fields.address.key}
                    defaultValue={fields.address.initialValue}
                    className="rounded-l-none"
                    placeholder="Address for Correspondence"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.address.errors}</p>
              </div>

              <div>
                <Label>Registered Address 2</Label>
                <div className="flex">
                  <Input
                    name={fields.address1.name}
                    key={fields.address1.key}
                    defaultValue={fields.address1.initialValue}
                    className="rounded-l-none"
                    placeholder="Address for Correspondence"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.address1.errors}</p>
              </div>
              <div>
                <Label>City/Town/Village</Label>
                <div className="flex">
                  <Input
                    name={fields.city.name}
                    key={fields.city.key}
                    defaultValue={fields.city.initialValue}
                    className="rounded-l-none"
                    placeholder="City/Town/Village"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.city.errors}</p>
              </div>

              <div>
                <Label>PIN Code</Label>
                <div className="flex">
                  <Input
                    name={fields.pinCode.name}
                    key={fields.pinCode.key}
                    defaultValue={fields.pinCode.initialValue}
                    className="rounded-l-none"
                    placeholder="PIN Code"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.pinCode.errors}</p>
              </div>

              <div>
                <Label>State</Label>
                <Select
                  value={instates}
                  name={fields.state.name}
                  key={fields.state.key}
                  onValueChange={(value) => setInstates(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Andhra Pradesh">
                      Andhra Pradesh
                    </SelectItem>
                    <SelectItem value="Arunachal Pradesh">
                      Arunachal Pradesh
                    </SelectItem>
                    <SelectItem value="Assam">Assam</SelectItem>
                    <SelectItem value="Bihar">Bihar</SelectItem>
                    <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="Goa">Goa</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Haryana">Haryana</SelectItem>
                    <SelectItem value="Himachal Pradesh">
                      Himachal Pradesh
                    </SelectItem>
                    <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Kerala">Kerala</SelectItem>
                    <SelectItem value="Madhya Pradesh">
                      Madhya Pradesh
                    </SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Manipur">Manipur</SelectItem>
                    <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                    <SelectItem value="Mizoram">Mizoram</SelectItem>
                    <SelectItem value="Nagaland">Nagaland</SelectItem>
                    <SelectItem value="Odisha">Odisha</SelectItem>
                    <SelectItem value="Punjab">Punjab</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Sikkim">Sikkim</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                    <SelectItem value="Tripura">Tripura</SelectItem>
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.state.errors}</p>
              </div>

              <div>
                <Label>Mobile</Label>
                <div className="flex">
                  <Input
                    name={fields.mobile.name}
                    key={fields.mobile.key}
                    defaultValue={fields.mobile.initialValue}
                    className="rounded-l-none"
                    placeholder="Mobile Number"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.mobile.errors}</p>
              </div>
              <div>
                <Label>Email</Label>
                <div className="flex">
                  <Input
                    name={fields.email.name}
                    key={fields.email.key}
                    defaultValue={fields.email.initialValue}
                    className="rounded-l-none"
                    placeholder="Email Address"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.email.errors}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Bank Details</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>Bank Name</Label>
                <div className="flex">
                  <Input
                    name={fields.bankName.name}
                    key={fields.bankName.key}
                    defaultValue={fields.bankName.initialValue}
                    className="rounded-l-none"
                    placeholder="Bank Name"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.bankName.errors}</p>
              </div>
              <div>
                <Label>Branch Account No</Label>
                <div className="flex">
                  <Input
                    name={fields.accountNo.name}
                    key={fields.accountNo.key}
                    defaultValue={fields.accountNo.initialValue}
                    className="rounded-l-none"
                    placeholder="Branch Account No."
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.accountNo.errors}</p>
              </div>

              <div>
                <Label>IFSC Code</Label>
                <div className="flex">
                  <Input
                    name={fields.ifsc.name}
                    key={fields.ifsc.key}
                    defaultValue={fields.ifsc.initialValue}
                    className="rounded-l-none"
                    placeholder="IFSC Code"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.ifsc.errors}</p>
              </div>

              <div>
                <Label>Account Type</Label>
                <div className="flex">
                  <RadioGroup defaultValue="savings">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="savings" id="savings" />
                      <Label htmlFor="savings">Savings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="current" id="current" />
                      <Label htmlFor="current">Current</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="others" id="others" />
                      <Label htmlFor="others">Others</Label>
                    </div>
                  </RadioGroup>
                </div>
                <p className="text-red-500 text-sm">{fields.accountType.errors}</p>
              </div>

              <div>
                <Label>6 Months Bank Statement</Label>
                <span className="text-xs"> (PDF, Self attested)</span>
                <Input type="file" name="bankUpload" className="rounded-md" />
                <p className="text-red-500 text-sm">{fields.bankUpload.errors}</p>
              </div>

              <div>
                <Label>Aadhar Card</Label>
                <span className="text-xs"> (PDF, Self attested)</span>
                <Input type="file" name="aadharUpload" className="rounded-md" />
                <p className="text-red-500 text-sm">{fields.aadharUpload.errors}</p>
              </div>

              <div>
                <Label>Cancelled Cheque</Label>
                <span className="text-xs"> (PDF)</span>
                <Input type="file" name="chequeUpload" className="rounded-md" />
                <p className="text-red-500 text-sm">{fields.chequeUpload.errors}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              Partner&apos;s Profile And Work Space Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label>Educational Qualification</Label>
                <Select
                  defaultValue="SELECT"
                  name={fields.education.name}
                  key={fields.education.key}
                  onValueChange={(value) => setEducate(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SELECT">Select</SelectItem>
                    <SelectItem value="10TH">10th</SelectItem>
                    <SelectItem value="12TH">12th</SelectItem>
                    <SelectItem value="GRADUATE">Graduate</SelectItem>
                    <SelectItem value="POST GRADUATE">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.education.errors}</p>
              </div>

              <div>
                <Label>Work Space</Label>
                <div className="flex">
                  <Input
                    name={fields.workSpace.name}
                    key={fields.workSpace.key}
                    defaultValue={fields.workSpace.initialValue}
                    className="rounded-l-none"
                    placeholder="Work Space"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.workSpace.errors}</p>
              </div>

              <div>
                <Label>Active Since (Trading)</Label>
                <div className="flex">
                  <Input
                    name={fields.active.name}
                    key={fields.active.key}
                    defaultValue={fields.active.initialValue}
                    className="rounded-l-none"
                    placeholder="Active Since (Trading)"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.active.errors}</p>
              </div>

              <div>
                <Label>Social Media</Label>
                <div className="flex">
                  <Input
                    name={fields.socialMedia.name}
                    key={fields.socialMedia.key}
                    defaultValue={fields.socialMedia.initialValue}
                    className="rounded-l-none"
                    placeholder="Social Media"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.socialMedia.errors}</p>
              </div>

              <div>
                <Label>Connectivity</Label>
                <div className="flex">
                  <Input
                    name={fields.connectivity.name}
                    key={fields.connectivity.key}
                    defaultValue={fields.connectivity.initialValue}
                    className="rounded-l-none"
                    placeholder="Connectivity"
                  />
                </div>
                <p className="text-red-500 text-sm">{fields.connectivity.errors}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              Infrastructure Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">

                <div>
              <Label>Total Number of Tables</Label>
              <div className="flex">
                <Input
                  name={fields.table.name}
                  key={fields.table.key}
                  defaultValue={fields.table.initialValue}
                  className="rounded-l-none"
                  placeholder="Total Number of Tables"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.table.errors}</p>
            </div>

            <div>
              <Label>Total Number of Chairs</Label>
              <div className="flex">
                <Input
                  name={fields.chair.name}
                  key={fields.chair.key}
                  defaultValue={fields.chair.initialValue}
                  className="rounded-l-none"
                  placeholder="Total Number of Chairs"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.chair.errors}</p>
            </div>

            <div>
              <Label>Printer</Label>
              <div className="flex">
                <Input
                  name={fields.printer.name}
                  key={fields.printer.key}
                  defaultValue={fields.printer.initialValue}
                  className="rounded-l-none"
                  placeholder="Printer"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.printer.errors}</p>
            </div>

            <div>
              <Label>Water Dispenser</Label>
              <div className="flex">
                <Input
                  name={fields.waterDispenser.name}
                  key={fields.waterDispenser.key}
                  defaultValue={fields.waterDispenser.initialValue}
                  className="rounded-l-none"
                  placeholder="Water Dispenser"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.waterDispenser.errors}</p>
            </div>


            <div>
              <Label>Refrigerator</Label>
              <div className="flex">
                <Input
                  name={fields.refrigerator.name}
                  key={fields.refrigerator.key}
                  defaultValue={fields.refrigerator.initialValue}
                  className="rounded-l-none"
                  placeholder="Refrigerator"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.refrigerator.errors}</p>
            </div>


            <div>
              <Label>Number of Employees</Label>
              <div className="flex">
                <Input
                  name={fields.employee.name}
                  key={fields.employee.key}
                  defaultValue={fields.employee.initialValue}
                  className="rounded-l-none"
                  placeholder="Number of Employees"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.employee.errors}</p>
            </div>

            <div>
              <Label>Filing Cabinets</Label>
              <div className="flex">
                <Input
                  name={fields.cabinets.name}
                  key={fields.cabinets.key}
                  defaultValue={fields.cabinets.initialValue}
                  className="rounded-l-none"
                  placeholder="Filing Cabinets"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.cabinets.errors}</p>
            </div>


            <div>
              <Label>Office Size</Label>
              <div className="flex">
                <Input
                  name={fields.officeSize.name}
                  key={fields.officeSize.key}
                  defaultValue={fields.officeSize.initialValue}
                  className="rounded-l-none"
                  placeholder="Office Size"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.officeSize.errors}</p>
            </div>


            <div>
                <Label>Office Type</Label>
                <Select
                  defaultValue="SELECT"
                  name={fields.officeType.name}
                  key={fields.officeType.key}
                  onValueChange={(value) => setEducate(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SELECT">Select</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="Owned">Owned</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500 text-sm">{fields.officeType.errors}</p>
              </div>

              
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Undertaking</h2>

            <div className="grid md:grid-cols-1 gap-6 mb-6">
              <div>
                <div className="flex items-start">
                  <Checkbox id="terms" className="mr-2" />
                  <Label htmlFor="terms" className="flex-1">
                    <p className="mb-2 text-base sm:text-sm">
                      I undertake that:
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-sm mb-2">
                      <li>
                        I have not been convicted for any offence in the past
                        and am not currently under trial for any offence
                        involving fraud and dishonesty.
                      </li>
                      <li>
                        I am neither an Authorized Person / Remiserof any other
                        member of the stock exchange / commodity exchange and
                        nor has/have applied for appointment as Authorized
                        Person / Remiserwith any other member of the stock
                        exchange / commodity exchange.
                      </li>
                      <li>
                        I confirm that I am not a defaulter / expelled by any
                        stock exchange/commodity exchange and not in the SEBI
                        banned entities.
                      </li>
                      <li>
                        I confirm that I am “fit and proper” under SEBI
                        (Intermediaries) Regulations and no action has been
                        taken against me by SEBI, RBI, etc. and I have not
                        defaulted in payment to any agency.
                      </li>
                    </ul>
                    <p className="mb-2 text-base sm:text-sm">
                      Business Guidelines for Partner
                    </p>
                    <p className="mb-2 text-base sm:text-sm">
                      Partner should have the zeal and passion to adopt
                      Tradejini business policies and the service guidelines
                      offered. They should follow the Tradejini principles and
                      identify themselves with the corporate goals to further
                      their success and business.
                    </p>
                    <p className="mb-2 text-base sm:text-sm">
                      Business guidelines for OP are
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-sm mb-2">
                      <li>
                        Activate a minimum of 40-50 clients in first 3 months
                      </li>
                      <li>
                        Generate a minimum brokerage revenue of 10,000 per
                        month, by 3rd month{" "}
                      </li>
                      <li>
                        Minimum brokerage to scale up to Rs.25, 000 per month by
                        6 months
                      </li>
                    </ul>
                    <p className="mb-2 text-base sm:text-sm">
                      The OP is expected to adopt either Rule 1 or Rule 2 in the
                      first 3 months. The OP will have to adopt the Rule 3 by 6
                      months from commencement of operations. The business
                      guidelines are to be followed under the strict code of
                      ethics and fairness of trade by clients to perform to the
                      potential of the partners.If these guidelines are not
                      achieved then Tradejini has the right to revoke or cancel
                      the OP status and they may be re-classified to “Client
                      Referral Program” Status.
                    </p>
                    <p className="mb-2 text-base sm:text-sm">
                      Payment Terms: The partner payout will happen every month
                      for a minimum billing of Rs.1000. The monthly payments is
                      subject to 5% TDS as per the Income tax rules. Partner
                      verification is a must (if not able to visit our
                      head-office then they need to come on remote access to
                      display the id and address proof).
                    </p>
                  </Label>
                </div>
                <p className="text-red-500 text-sm">{fields.consent.errors}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Send" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
