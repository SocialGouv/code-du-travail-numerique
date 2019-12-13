import React from "react";
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

export const base = () => (
  <>
    <Section>
      <InputCheckbox
        label="Option 1"
        name="checkbox"
        id="option_1"
        value="option_1"
      />
      <InputCheckbox
        label="Option 2"
        name="checkbox"
        id="option_2"
        value="option_2"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input</Label>
      <Input name="input" id="input" />
    </Section>
    <Section>
      <Label htmlFor="input_date">Input Date</Label>
      <InputDate name="input_date" id="input_date" />
    </Section>
    <Section>
      <InputRadio
        label="Option 1"
        name="radio"
        id="option_1"
        value="option_1"
      />
      <InputRadio
        label="Option 2"
        name="radio"
        id="option_2"
        value="option_2"
      />
    </Section>
    <Section>
      <Label htmlFor="select">Select</Label>
      <Select id="select">
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
    <Section>
      <Label htmlFor="textarea">Textarea</Label>
      <Textarea name="textarea" id="textarea" />
    </Section>
  </>
);

export const checkbox = () => (
  <>
    <Section>
      <InputCheckbox
        label="Option 1"
        name="checkbox"
        id="option_1"
        value="option_1"
      />
      <InputCheckbox
        label="Option 2"
        name="checkbox"
        id="option_2"
        value="option_2"
      />
    </Section>
  </>
);

export const input = () => (
  <>
    <Section>
      <Label htmlFor="input">Input normal</Label>
      <Input
        id="input"
        name="input"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input avec picto 32</Label>
      <Input
        id="input"
        name="input"
        icon={Search}
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input avec picto currency</Label>
      <Input id="input" name="input" type="number" icon={Euro} />
    </Section>
    <Section>
      <Label htmlFor="input">Input avec texte</Label>
      <Input
        id="input"
        name="input"
        value="Avec texte"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input" autofocus>
        Input Focus
      </Label>
      <Input
        id="input"
        name="input"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input erreur</Label>
      <Input name="input" id="input" value="Avec texte" invalid={true} />
    </Section>
  </>
);

export const inputDate = () => (
  <>
    <Section>
      <Label htmlFor="input_date">Input Date</Label>
      <InputDate name="input_date" id="input_date" />
    </Section>
  </>
);

export const radio = () => (
  <>
    <Section>
      <InputRadio
        label="Option 1"
        name="radio"
        id="option_1"
        value="option_1"
      />
      <InputRadio
        label="Option 2"
        name="radio"
        id="option_2"
        value="option_2"
      />
    </Section>
  </>
);

export const select = () => (
  <>
    <Section>
      <Label htmlFor="select">Select</Label>
      <Select id="select">
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
    <Section>
      <Label htmlFor="select_disabled">Select disabled</Label>
      <Select id="select_disabled" disabled>
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
  </>
);
