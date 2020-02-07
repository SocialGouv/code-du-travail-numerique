import React from "react";
import styled from "styled-components";

import { Section } from "../layout/Section";
import { Input } from "./Input";
import { InputDate } from "./InputDate";
import { Label } from "./Label";
import { InputRadio } from "./Radio";
import { InputCheckbox } from "./Checkbox";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { Euro, Search } from "../icons";

export default {
  component: Select,
  title: "Field|Components"
};

const StyledInput = styled(Input)`
  width: 40rem;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

export const base = () => (
  <>
    <Section>
      <Label htmlFor="input">Input</Label>
      <Input name="input" id="input" />
    </Section>
    <Section>
      <Label htmlFor="input_date">Input Date</Label>
      <InputDate name="input_date" id="input_date" />
    </Section>
    <Section>
      <Label htmlFor="select">Select</Label>
      <Select id="select">
        <option></option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
    <Section>
      <Label htmlFor="textarea">Textarea</Label>
      <Textarea name="textarea" id="textarea" />
    </Section>
    <Section>
      <InputCheckbox
        label="Option 1"
        name="checkbox"
        id="option_checkbox_1"
        value="option_1"
      />
      <InputCheckbox
        label="Option 2 (3rem)"
        name="checkbox"
        id="option_checkbox_2"
        value="option_2"
        size="3rem"
      />
      <InputCheckbox
        label="Option 3 (4rem)"
        name="checkbox"
        id="option_checkbox_3"
        value="option_3"
        size="4rem"
      />
    </Section>
    <Section>
      <InputRadio
        label="Option 1"
        name="radio"
        id="option_radio_1"
        value="option_radio_1"
      />
      <InputRadio
        label="Option 2 (3rem)"
        name="radio"
        id="option_2"
        value="option_2"
        size="3rem"
      />
      <InputRadio
        label="Option 3 (4rem)"
        name="radio"
        id="option_3"
        value="option_3"
        size="4rem"
      />
    </Section>
  </>
);

export const checkbox = () => (
  <>
    <Section>
      <InputCheckbox
        label="Option 1 with a very long label so you get what happens when it is on 2 lines"
        name="checkbox"
        id="option_1"
        value="option_1"
      />
      <InputCheckbox
        label="Option 2 (3rem)"
        name="checkbox"
        id="option_2"
        value="option_2"
        size="3rem"
      />
      <InputCheckbox
        label="Option 3 (4rem)"
        name="checkbox"
        id="option_3"
        value="option_3"
        size="4rem"
      />
    </Section>
  </>
);

export const input = () => (
  <>
    <Section>
      <Label htmlFor="input">Standard Input</Label>
      <Input
        id="input"
        name="input"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input1">Input with Icon</Label>
      <Input
        id="input1"
        name="input1"
        icon={Search}
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input2">Input with Euro Icon</Label>
      <StyledInput id="input2" name="input2" type="number" icon={Euro} />
    </Section>
    <Section>
      <Label htmlFor="input3">Input with text</Label>
      <Input
        id="input3"
        name="input3"
        value="Avec texte"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input5">Disabled Input</Label>
      <Input name="input5" id="input5" disabled />
    </Section>
    <Section>
      <Label htmlFor="input6">Errored Input</Label>
      <Input name="input6" id="input6" invalid />
    </Section>
  </>
);

export const inputDate = () => (
  <>
    <Section>
      <Label htmlFor="input_date">Input Date</Label>
      <InputDate name="input_date" id="input_date" />
    </Section>
    <Section>
      <Label htmlFor="input_date1">Disabled Input Date</Label>
      <InputDate name="input_date1" disabled id="input_date1" />
    </Section>
    <Section>
      <Label htmlFor="input_date1">Invalid Input Date</Label>
      <InputDate name="input_date1" invalid id="input_date1" />
    </Section>
  </>
);

export const radio = () => (
  <>
    <Section>
      <InputRadio
        label="Option 1 with a very long label so you get what happens when it is on 2 lines"
        name="radio"
        id="option_1"
        value="option_1"
      />
      <InputRadio
        label="Option 2 (3rem)"
        name="radio"
        id="option_2"
        value="option_2"
        size="3rem"
      />
      <InputRadio
        label="Option 3 (4rem)"
        name="radio"
        id="option_3"
        value="option_3"
        size="4rem"
      />
    </Section>
  </>
);

export const select = () => (
  <>
    <Section>
      <Label htmlFor="select">Select</Label>
      <StyledSelect id="select">
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </StyledSelect>
    </Section>
    <Section>
      <Label htmlFor="select_disabled">Disabled Select</Label>
      <Select id="select_disabled" disabled>
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
    <Section>
      <Label htmlFor="select_disabled">Invalid Select</Label>
      <Select id="select_disabled" invalid>
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
  </>
);

export const textarea = () => (
  <>
    <Section>
      <Label htmlFor="textarea">Textarea</Label>
      <Textarea name="textarea" id="textarea" />
    </Section>
    <Section>
      <Label htmlFor="textarea1">Disabled Textarea</Label>
      <Textarea name="textarea1" id="textarea1" disabled />
    </Section>
  </>
);
