package de.treichels.wea.bat64;

import de.treichels.wea.bat64.gen.Root;
import de.treichels.wea.bat64.xml.Unmarshaller;
import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;
import de.treichels.wea.bat64.xml.XmlWriter;

public class LoadTest {
	public static void main(final String[] args) throws Exception {
		final XmlReader reader = new XmlReader();
		final XmlWriter writer = new XmlWriter();
		final XmlElement rootElement = reader.read("Full2.model");

		// writer.write(rootElement, "F4U-1D Corsair1.model");

		final Root root = new Root();
		Unmarshaller.unmarshal(rootElement, root);

		assert root.getBindingConfig().getRxs().size() == 3;
		// assert root.getBindingConfig().getRxs().get(0).getSerial() ==
		// 320081100000l;

		// assert root.getConfigLVario().getSensors().getSensor() != null;
		// assert root.getConfigLVario().getSensors().getSensor().get(0) !=
		// null;
		// assert
		// root.getConfigLVario().getSensors().getSensor().get(0).getItem().equals("Temperature");

		final XmlElement rootElement2 = new XmlElement("root", 32, null);
		// Marshaller.marshal(root, rootElement);

		// assert rootElement.equals(rootElement2);

		writer.write(rootElement2, "Full3.model");
	}
}
