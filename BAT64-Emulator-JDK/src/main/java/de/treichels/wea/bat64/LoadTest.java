package de.treichels.wea.bat64;

import javax.xml.stream.XMLStreamException;

import de.treichels.wea.bat64.gen.Root;
import de.treichels.wea.bat64.xml.XmlElement;
import de.treichels.wea.bat64.xml.XmlReader;
import de.treichels.wea.bat64.xml.XmlWriter;

public class LoadTest {
	public static void main(final String[] args)
			throws XMLStreamException, InstantiationException, IllegalAccessException {
		final XmlReader reader = new XmlReader();
		final XmlWriter writer = new XmlWriter();
		final XmlElement rootElement = reader.read("F4U-1D Corsair.model");

		// writer.write(rootElement, "F4U-1D Corsair1.model");

		final Root root = new Root();
		root.load(rootElement);

		assert root.getBindingConfig().getRxs().size() == 3;
		assert root.getBindingConfig().getRxs().get(0).getSerial() == 320081100000l;

		assert root.getConfigLVario().getSensors().getSensor() != null;
		assert root.getConfigLVario().getSensors().getSensor().get(0) != null;
		assert root.getConfigLVario().getSensors().getSensor().get(0).getItem().equals("Temperature");

		final XmlElement rootElement2 = new XmlElement("root", 32, null);
		root.store(rootElement2);

		// assert rootElement.equals(rootElement2);

		writer.write(rootElement2, "F4U-1D Corsair2.model");
	}
}
