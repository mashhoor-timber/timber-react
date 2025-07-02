
import { Divider, Spacer } from '@heroui/react';
import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';

import Textarea from '@components/atomic/Textarea';


import { userSchema } from '../schema'; //userSchema
import { UserPayload } from '../types'// userPayload
import Form from "@components/atomic/Form";

import MobilenumberInput from '@components/atomic/MobilenumberInput';
import Select, { SelectItem } from '@components/atomic/Select';


export default function AddUserForm() {

    const onSubmit = async (values: UserPayload) => {
        const payload: UserPayload = {
            ...values,

        }
    }
    const initialValues: UserPayload = {
        name: '',
        email: '',
        mobile: '',
        country_code: '+971',
        country: '',
        city: '',
        address: '',
        trn: '',
        role: 'customer',
    }

    return (
        <Form
            defaultValues={initialValues}
            schema={userSchema}
            onSubmit={onSubmit}
            resetOnSubmit
        >
            {({ formState: { isSubmitting, isValid, isDirty, errors } }) => (
                <div className="space-y-3">
                    <Input
                        name="logo"
                        type="file"
                        label="Logo"
                    />
                    <Input
                        isRequired
                        label="Company Name"
                        name="name"
                        placeholder="Enter name"
                    />

                    <Select
                        name='role'
                        defaultSelectedKeys={['customer']}
                        label="Role"
                        placeholder="Select role"
                    >
                        <SelectItem key="customer" value="customer">
                            Customer
                        </SelectItem>
                        <SelectItem key="biller" value="biller">
                            Biller
                        </SelectItem>
                        <SelectItem key="vendor" value="vendor">
                            Vendor
                        </SelectItem>
                    </Select>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <Input
                            isRequired
                            label="Email"
                            name="email"
                            placeholder="Enter email"
                        />
                        <MobilenumberInput
                            isRequired
                            label="Phone Number"
                            nameCode="country_code"
                            nameMobile="mobile"
                        />
                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <SelectInputWithSearch
                                    isRequired
                                    label="Country or region"
                                    name="country"
                                    options={countryData}
                                    placeholder="Select country"
                                />
                                <Input
                                    isRequired
                                    label="City"
                                    name="city"
                                    placeholder="Enter city"
                                />
                            </div> */}

                    <Textarea
                        isRequired
                        label="Address"
                        minRows={4}
                        name="address"
                        placeholder="Please enter an address"
                    />
                    <Input label="TRN" name="trn" placeholder="Enter TRN (if any)" />


                    <div className="w-full">
                        <Divider />
                        <Spacer y={4} />
                        <div className="flex justify-end gap-2">

                            <Button color="primary" type="submit" isLoading={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </div>

                </div>
            )}
        </Form>

    );
}
