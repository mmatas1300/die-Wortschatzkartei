import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const AccordionFAQ = () => (
    <Accordion.Root
        className="bg-blue-card rounded-xl w-full p-7 m-auto"
        type="single"
        defaultValue=""
        collapsible
    >
        <div className='ms-6 text-lg'>FAQ</div>
        <AccordionItem value="item-1">
            <AccordionTrigger>What is 'die Wortschatzkartei' ?</AccordionTrigger>
            <AccordionContent>'die Wortschatzkartei' is a web application designed to create your own vocabulary flashcards and learn German vocabulary with spaced repetition.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger>How can I get started?</AccordionTrigger>
            <AccordionContent>
            Create an account by clicking 'Anmelden', select the 'Registrieren' button and enter your email and password. Once you are registered, you can log in using the 'Anmelden' section of the form.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger>What do I do once I'm logged in?</AccordionTrigger>
            <AccordionContent>
            Once you've logged in, set up your account with your nickname (Spitzname) and choose whether you want to use your own cards or the ones loaded by default. You can change these settings whenever you want in the 'Mein Konto' section.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
            <AccordionTrigger>How can I create my own cards?</AccordionTrigger>
            <AccordionContent>
            You can find the 'Neue Karte erstellen' form in the 'Karteneditor' section. In this form, you can choose the type of word you want to add. You can add nouns (Nomen), verbs (Verb), words that have variations for men and women (Gleichstellungsnomen), and any other category (Andere Wort).
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
            <AccordionTrigger>Where can I see my cards?</AccordionTrigger>
            <AccordionContent>
            You can find your cards sorted in the 'Wörterbuch' section. In order to view your cards, it's necessary that you have previously configured your account to use your own cards. Otherwise, you will see the default cards.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
            <AccordionTrigger>How can I edit my cards?</AccordionTrigger>
            <AccordionContent>
            In the 'Karteneditor' section, you will find the 'Karten verwalten' form, where you can manage your cards. You can edit them, reset their progress, or delete them.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
            <AccordionTrigger>How can I study the cards?</AccordionTrigger>
            <AccordionContent>
            In the 'Üben' section, you can start your daily practice. When a card is presented to you, you should remember its meaning and additional information. If you were able to recall it, click the 'Richtig' button; otherwise, click 'Falsch'. Remember that the cards you practice with depend on the settings established in the 'Mein Konto' section.
            </AccordionContent>
        </AccordionItem>
    </Accordion.Root>
);

const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={classNames(
            'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={classNames(
                'group flex h-[45px] flex-1 cursor-default items-center justify-between bg-black-card px-5 text-[15px] leading-none outline-none',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <ChevronDownIcon
                className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
            />
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={classNames(
            'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
));

export default AccordionFAQ;