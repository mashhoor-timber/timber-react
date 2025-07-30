import Textarea from "@components/atomic/Textarea";

function TermsAndConditions() {
  return (
    <>
      <div className="space-y-3">
        <Textarea
          label=""
          minRows={4}
          name="terms"
          placeholder="Terms and Conditions"
        />

        <Textarea label="" minRows={4} name="notes" placeholder="Notes" />
      </div>
    </>
  );
}

export default TermsAndConditions;
